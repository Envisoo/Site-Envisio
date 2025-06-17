import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface EditPurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: PurchaseOrder) => void;
  order: PurchaseOrder | null;
  suppliers: Supplier[];
  items: Item[];
}

interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  expectedDeliveryDate: string;
  notes: string;
  status: 'pending' | 'approved' | 'delivered';
}

interface PurchaseOrderItem {
  itemId: string;
  quantity: number;
  unitPrice: number;
}

export const EditPurchaseOrderModal: React.FC<EditPurchaseOrderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  order,
  suppliers,
  items,
}) => {
  const [formData, setFormData] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemId: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index: number, field: keyof PurchaseOrderItem, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Pedido de Compra</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Fornecedor</Label>
            <Select
              value={formData.supplierId}
              onValueChange={(value) => setFormData({ ...formData, supplierId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o fornecedor" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Itens</Label>
            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Select
                  value={item.itemId}
                  onValueChange={(value) => handleItemChange(index, 'itemId', value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione o item" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Qtd"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  className="w-24"
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Preço"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                  className="w-32"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddItem} className="mt-2">
              Adicionar Item
            </Button>
          </div>

          <div>
            <Label>Data Prevista de Entrega</Label>
            <Input
              type="date"
              value={formData.expectedDeliveryDate}
              onChange={(e) =>
                setFormData({ ...formData, expectedDeliveryDate: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Observações</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações adicionais"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
