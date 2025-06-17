import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Item) => void;
  item: Item | null;
  categories: string[];
  suppliers: Supplier[];
}

interface Item {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  unidade: string;
  estoqueMinimo: number;
  estoqueAtual: number;
  custo: number;
  fornecedorId: string;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
  categories,
  suppliers,
}) => {
  const [formData, setFormData] = useState<Item>({
    id: '',
    nome: '',
    descricao: '',
    categoria: '',
    unidade: '',
    estoqueMinimo: 0,
    estoqueAtual: 0,
    custo: 0,
    fornecedorId: '',
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Item</DialogTitle>
          <DialogDescription>
            Altere as informações do item
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>

          <div>
            <Label>Categoria</Label>
            <Select
              value={formData.categoria}
              onValueChange={(value) => setFormData({ ...formData, categoria: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Unidade</Label>
            <Input
              value={formData.unidade}
              onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Estoque Mínimo</Label>
              <Input
                type="number"
                value={formData.estoqueMinimo}
                onChange={(e) => setFormData({ ...formData, estoqueMinimo: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Estoque Atual</Label>
              <Input
                type="number"
                value={formData.estoqueAtual}
                onChange={(e) => setFormData({ ...formData, estoqueAtual: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label>Custo</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.custo}
              onChange={(e) => setFormData({ ...formData, custo: Number(e.target.value) })}
            />
          </div>

          <div>
            <Label>Fornecedor</Label>
            <Select
              value={formData.fornecedorId}
              onValueChange={(value) => setFormData({ ...formData, fornecedorId: value })}
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
