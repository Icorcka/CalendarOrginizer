async function fetchAvailableCountries() {
    const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
    const countries = await response.json();
    return countries.map((country: any) => country.countryCode);
  }
  
async function fetchHolidaysForCountry(countryCode: string) {
    const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
    const holidays = await response.json();
    return holidays;
}

export async function fetchHolidaysForDateRange(startDate: Date, endDate: Date) {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    const countries = await fetchAvailableCountries();
    let allHolidays: any[] = [];

    for (const countryCode of countries) {
        const holidays = await fetchHolidaysForCountry(countryCode);
        allHolidays = allHolidays.concat(holidays);
    }

    const holidaysByDate: { [key: string]: any[] } = {};

    allHolidays.forEach(holiday => {
        for (let year = startYear; year <= endYear; year++) {
            const modifiedDate = new Date(holiday.date);
            modifiedDate.setFullYear(year);
            const key = modifiedDate.toISOString().split('T')[0];

            if (!holidaysByDate[key]) {
                holidaysByDate[key] = [];
            }

            if (holidaysByDate[key].length < 2 && !holidaysByDate[key].some(h => h.name === holiday.name)) {
                holidaysByDate[key].push({ ...holiday, date: modifiedDate });
            }
        }
    });

    return holidaysByDate;
}
  
