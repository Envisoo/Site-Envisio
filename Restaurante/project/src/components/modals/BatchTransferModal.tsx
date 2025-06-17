import React, { useState } from 'react';
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

interface BatchTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (transfer: BatchTransfer) => void;
  items: Item[];
  locations: string[];
}

interface BatchTransfer {
  origem: string;
  destino: string;
  items: TransferItem[];
  observacoes: string;
}

interface TransferItem {
  itemId: string;
  quantidade: number;
}

interface Item {
  id: string;
  nome: string;
  estoqueAtual: number;
}

export const BatchTransferModal: React.FC<BatchTransferModalProps> = ({
  isOpen,
  onClose,
  onTransfer,
  items,
  locations,
}) => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [transferItems, setTransferItems] = useState<TransferItem[]>([]);
  const [observacoes, setObservacoes] = useState('');

  const handleAddItem = () => {
    setTransferItems([...transferItems, { itemId: '', quantidade: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    setTransferItems(transferItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof TransferItem, value: any) => {
    const newItems = [...transferItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setTransferItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTransfer({
      origem,
      destino,
      items: transferItems,
      observacoes,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transferência em Lote</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Local de Origem</Label>
              <Select value={origem} onValueChange={setOrigem}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Local de Destino</Label>
              <Select value={destino} onValueChange={setDestino}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o destino" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {transferItems.map((item, index) => (
            <div key={index} className="flex gap-2">
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
                      {i.nome} (Disponível: {i.estoqueAtual})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min={1}
                value={item.quantidade}
                onChange={(e) => handleItemChange(index, 'quantidade', Number(e.target.value))}
                className="w-24"
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

          <Button type="button" onClick={handleAddItem}>
            Adicionar Item
          </Button>

          <div>
            <Label>Observações</Label>
            <Textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações sobre a transferência"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={!origem || !destino || transferItems.length === 0 || origem === destino}
            >
              Confirmar Transferência
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
