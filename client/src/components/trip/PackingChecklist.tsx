"use client";

import { useState } from "react";
import { toast } from "sonner";

import { api } from "@/lib/api/axios";

import AddPackingItemDialog from "./AddPackingItemDialog";
import DeletePackingItemDialog from "./DeletePackingItemDialog";
import PackingProgress from "./PackingProgress";

interface PackingItem {
  item: string;
  packed: boolean;
  addedByUser: boolean;
}

interface Props {
  tripId: string;
  packingList: PackingItem[];
}

export default function PackingChecklist({ tripId, packingList }: Props) {
  const [items, setItems] = useState<PackingItem[]>(packingList);

  const savePackingList = async (updatedItems: PackingItem[]) => {
    try {
      await api.put(`/trips/${tripId}/packing-list`, {
        packingList: updatedItems,
      });

      toast.success("Packing list updated");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update packing list");
    } finally {
    }
  };

  const togglePacked = (index: number) => {
    const updated = structuredClone(items);

    updated[index].packed = !updated[index].packed;

    setItems(updated);

    savePackingList(updated);
  };

  const addItem = (item: string) => {
    const updated = [
      ...items,
      {
        item,
        packed: false,
        addedByUser: true,
      },
    ];

    setItems(updated);

    savePackingList(updated);
  };

  const deleteItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);

    setItems(updated);

    savePackingList(updated);
  };

  const packedCount = items.filter((item) => item.packed).length;

  return (
    <div className="space-y-6">
      <PackingProgress packed={packedCount} total={items.length} />

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item.item}-${index}`}
            className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm"
          >
            <label className="flex items-center gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => togglePacked(index)}
                className="h-5 w-5"
              />

              <span
                className={item.packed ? "line-through text-slate-400" : ""}
              >
                {item.item}
              </span>
            </label>

            {item.addedByUser && (
              <DeletePackingItemDialog onDelete={() => deleteItem(index)} />
            )}
          </div>
        ))}
      </div>

      <AddPackingItemDialog onAdd={addItem} />
    </div>
  );
}
