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

interface BatchAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdjust: (adjustments: ItemAdjustment[]) => void;
  items: Item[];
}

interface ItemAdjustment {
  itemId: string;
  quantidade: number;
  motivo: string;
}

interface Item {
  id: string;
  nome: string;
  estoqueAtual: number;
}

export const BatchAdjustmentModal: React.FC<BatchAdjustmentModalProps> = ({
  isOpen,
  onClose,
  onAdjust,
  items,
}) => {
  const [adjustments, setAdjustments] = useState<ItemAdjustment[]>([]);
  const [motivoGeral, setMotivoGeral] = useState('');

  const handleAddAdjustment = () => {
    setAdjustments([...adjustments, { itemId: '', quantidade: 0, motivo: '' }]);
  };

  const handleRemoveAdjustment = (index: number) => {
    setAdjustments(adjustments.filter((_, i) => i !== index));
  };

  const handleAdjustmentChange = (index: number, field: keyof ItemAdjustment, value: any) => {
    const newAdjustments = [...adjustments];
    newAdjustments[index] = { ...newAdjustments[index], [field]: value };
    setAdjustments(newAdjustments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adjustmentsWithReason = adjustments.map(adj => ({
      ...adj,
      motivo: adj.motivo || motivoGeral
    }));
    onAdjust(adjustmentsWithReason);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajuste em Lote</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Motivo Geral</Label>
            <Textarea
              value={motivoGeral}
              onChange={(e) => setMotivoGeral(e.target.value)}
              placeholder="Motivo geral para todos os ajustes"
            />
          </div>

          {adjustments.map((adjustment, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-lg">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Item</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={adjustment.itemId}
                    onChange={(e) => handleAdjustmentChange(index, 'itemId', e.target.value)}
                  >
                    <option value="">Selecione um item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nome} (Atual: {item.estoqueAtual})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-32">
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    value={adjustment.quantidade}
                    onChange={(e) => handleAdjustmentChange(index, 'quantidade', Number(e.target.value))}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveAdjustment(index)}
                  className="mt-6"
                >
                  Remover
                </Button>
              </div>
              <div>
                <Label>Motivo Específico (opcional)</Label>
                <Input
                  value={adjustment.motivo}
                  onChange={(e) => handleAdjustmentChange(index, 'motivo', e.target.value)}
                  placeholder="Motivo específico para este item"
                />
              </div>
            </div>
          ))}

          <Button type="button" onClick={handleAddAdjustment}>
            Adicionar Item
          </Button>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={adjustments.length === 0}>
              Confirmar Ajustes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
