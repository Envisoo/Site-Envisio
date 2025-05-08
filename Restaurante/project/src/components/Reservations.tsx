import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Reservation } from '../types';

export const Reservations: React.FC = () => {
  const { user } = useUser();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '1',
    notes: ''
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (reservations.length > 0) {
      localStorage.setItem('reservations', JSON.stringify(reservations));
    }
  }, [reservations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Por favor, faça login para realizar uma reserva.');
      return;
    }

    if (editingId) {
      handleUpdate(e);
      return;
    }

    const newReservation: Reservation = {
      id: Date.now(),
      userId: user.id,
      ...formData,
      status: 'pending'
    };

    setReservations(prev => [...prev, newReservation]);
    
    setFormData({
      date: '',
      time: '',
      guests: '1',
      notes: ''
    });

    alert('Reserva realizada com sucesso! Aguarde a confirmação.');
  };

  const handleDelete = (reservationId: number) => {
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      setReservations(prev => prev.filter(res => res.id !== reservationId));
      alert('Reserva cancelada com sucesso!');
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setFormData({
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      notes: reservation.notes
    });
    setEditingId(reservation.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    setReservations(prev => prev.map(res => 
      res.id === editingId 
        ? { ...res, ...formData, status: 'pending' }
        : res
    ));
    
    setFormData({
      date: '',
      time: '',
      guests: '1',
      notes: ''
    });
    setEditingId(null);
    alert('Reserva atualizada com sucesso!');
  };

  const getAvailableTimes = () => {
    const times = [];
    for (let hour = 11; hour <= 22; hour++) {
      times.push(`${hour}:00`);
      if (hour !== 22) times.push(`${hour}:30`);
    }
    return times;
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-serif text-amber-800 mb-4">Sistema de Reservas</h1>
        <p className="text-gray-600">Por favor, faça login para realizar uma reserva.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-serif text-amber-800 text-center mb-8">
        Sistema de Reservas
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-serif text-amber-800 mb-6">
            {editingId ? 'Editar Reserva' : 'Nova Reserva'}
          </h2>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Data da Reserva
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-500 focus:ring focus:ring-amber-200 transition-colors"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Horário
            </label>
            <select
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-500 focus:ring focus:ring-amber-200 transition-colors"
            >
              <option value="">Selecione um horário</option>
              {getAvailableTimes().map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Número de Pessoas
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-500 focus:ring focus:ring-amber-200 transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'pessoa' : 'pessoas'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 rounded-md border-2 border-amber-200 focus:border-amber-500 focus:ring focus:ring-amber-200 transition-colors"
              rows={4}
              placeholder="Alguma solicitação especial para sua reserva?"
            />
          </div>

          <div className="flex gap-4">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    date: '',
                    time: '',
                    guests: '1',
                    notes: ''
                  });
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar Edição
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-amber-600 text-white py-3 rounded-full hover:bg-amber-700 transition-colors font-medium"
            >
              {editingId ? 'Atualizar Reserva' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-amber-800 mb-6">Suas Reservas</h2>
          <div className="space-y-4">
            {reservations
              .filter(res => res.userId === user.id)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(reservation => (
                <div 
                  key={reservation.id} 
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium text-lg">
                        {new Date(reservation.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-gray-600">Horário: {reservation.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {reservation.status === 'pending' ? 'Pendente' :
                       reservation.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                    </span>
                  </div>
                  <p className="text-gray-600">Mesa para {reservation.guests} {parseInt(reservation.guests) === 1 ? 'pessoa' : 'pessoas'}</p>
                  {reservation.notes && (
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Observações:</span> {reservation.notes}
                    </p>
                  )}
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(reservation)}
                      className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            {reservations.filter(res => res.userId === user.id).length === 0 && (
              <p className="text-center text-gray-500">
                Você ainda não possui reservas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};