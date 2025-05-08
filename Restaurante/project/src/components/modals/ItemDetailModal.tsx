import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  onEdit: () => void;
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
  fornecedor: string;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  isOpen,
  onClose,
  item,
  onEdit,
}) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Nome</h3>
            <p>{item.nome}</p>
          </div>

          <div>
            <h3 className="font-semibold">Descrição</h3>
            <p>{item.descricao}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Categoria</h3>
              <p>{item.categoria}</p>
            </div>
            <div>
              <h3 className="font-semibold">Unidade</h3>
              <p>{item.unidade}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Estoque Mínimo</h3>
              <p>{item.estoqueMinimo}</p>
            </div>
            <div>
              <h3 className="font-semibold">Estoque Atual</h3>
              <p>{item.estoqueAtual}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Custo</h3>
              <p>R$ {item.custo !== undefined ? item.custo.toFixed(2) : "0.00"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Fornecedor</h3>
              <p>{item.fornecedor}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={onEdit}>
              Editar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
