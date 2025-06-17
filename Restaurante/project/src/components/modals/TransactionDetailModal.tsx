import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

interface Transaction {
  id: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment' | 'waste';
  itemId: string;
  itemName: string;
  quantity: number;
  date: Date;
  userId: string;
  userName: string;
  reason?: string;
  source?: string;
  destination?: string;
  wasteReason?: 'expired' | 'damaged' | 'quality' | 'other';
}

const transactionTypes = {
  in: 'Entrada',
  out: 'Saída',
  transfer: 'Transferência',
  adjustment: 'Ajuste',
  waste: 'Desperdício',
};

const wasteReasons = {
  expired: 'Expirado',
  damaged: 'Danificado',
  quality: 'Qualidade',
  other: 'Outro',
};

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Tipo</h3>
              <p>{transactionTypes[transaction.type]}</p>
            </div>
            <div>
              <h3 className="font-semibold">Data</h3>
              <p>{format(transaction.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Item</h3>
            <p>{transaction.itemName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Quantidade</h3>
              <p>{transaction.quantity}</p>
            </div>
            <div>
              <h3 className="font-semibold">Responsável</h3>
              <p>{transaction.userName}</p>
            </div>
          </div>

          {transaction.type === 'transfer' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Origem</h3>
                <p>{transaction.source}</p>
              </div>
              <div>
                <h3 className="font-semibold">Destino</h3>
                <p>{transaction.destination}</p>
              </div>
            </div>
          )}

          {transaction.type === 'waste' && (
            <div>
              <h3 className="font-semibold">Motivo do Desperdício</h3>
              <p>{wasteReasons[transaction.wasteReason || 'other']}</p>
            </div>
          )}

          {transaction.reason && (
            <div>
              <h3 className="font-semibold">Observações</h3>
              <p>{transaction.reason}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
