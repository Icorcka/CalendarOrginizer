import React, { useEffect, useState } from "react";
import { CloseButton, ModalContent, StyledModal } from "./event-modal.styles";
import { format } from "date-fns";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (eventDetails: { date: string; name: string; color: string }) => void;
    date: string;
    editingEvent?: { name: string; color: string };
  }
  
  const EventModal: React.FC<ModalProps> = ({ show, onClose, onSubmit, date, editingEvent }) => {
    const [eventName, setEventName] = useState('');
    const [color, setColor] = useState('blue');

    useEffect(() => {
        if (editingEvent) {
          setEventName(editingEvent.name);
          setColor(editingEvent.color);
        } else {
          setEventName('');
          setColor('blue');
        }
      }, [editingEvent]);

    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange'];
  
    const handleSubmit = () => {
        onSubmit({ date, name: eventName, color });
        onClose();
    };
  
    if (!show) {
      return null;
    }
  
    return (
        <StyledModal show={show}>
          <ModalContent>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <h3>Add Event on {format(new Date(date), 'PPP')}</h3>
            <input 
              type="text" 
              placeholder="Event Name" 
              value={eventName} 
              onChange={(e) => setEventName(e.target.value)}
            />
            <select value={color} onChange={(e) => setColor(e.target.value)}>
            {colors.map((colorOption, index) => (
                <option key={index} value={colorOption}>{colorOption}</option>
            ))}
            </select>
            <button onClick={handleSubmit}>Add Event</button>
          </ModalContent>
        </StyledModal>
      );
  };

export default EventModal;
  