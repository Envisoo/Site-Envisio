import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface ReceivePOModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceive: (recebimento: PORecebimento) => void;
  purchaseOrder: PurchaseOrder;
}

interface PORecebimento {
  items: POItemRecebimento[];
  observacoes: string;
  numeroNF: string;
}

interface POItemRecebimento {
  itemId: string;
  quantidadeRecebida: number;
  quantidadePedida: number;
}

interface PurchaseOrder {
  id: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
  }[];
}

export const ReceivePOModal: React.FC<ReceivePOModalProps> = ({
  isOpen,
  onClose,
  onReceive,
  purchaseOrder,
}) => {
  const [items, setItems] = useState<POItemRecebimento[]>(
    purchaseOrder.items.map(item => ({
      itemId: item.itemId,
      quantidadeRecebida: item.quantity,
      quantidadePedida: item.quantity,
    }))
  );
  const [observacoes, setObservacoes] = useState('');
  const [numeroNF, setNumeroNF] = useState('');

  const handleQuantityChange = (itemId: string, quantidade: number) => {
    setItems(items.map(item => 
      item.itemId === itemId ? { ...item, quantidadeRecebida: quantidade } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReceive({
      items,
      observacoes,
      numeroNF,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Receber Pedido de Compra</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Número da Nota Fiscal</Label>
            <Input
              required
              value={numeroNF}
              onChange={(e) => setNumeroNF(e.target.value)}
              placeholder="Digite o número da NF"
            />
          </div>

          <div className="space-y-2">
            <Label>Itens Recebidos</Label>
            {purchaseOrder.items.map((item, index) => (
              <div key={item.itemId} className="flex gap-4 items-center">
                <span className="flex-1">{item.itemName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Pedido: {item.quantity}</span>
                  <Input
                    type="number"
                    min={0}
                    value={items[index].quantidadeRecebida}
                    onChange={(e) => handleQuantityChange(item.itemId, Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Label>Observações</Label>
            <Textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações sobre o recebimento"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Confirmar Recebimento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
