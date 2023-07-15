import { useGetInventory } from "../api/fetch-inventory";


export const Inventory = () => {
  const { data } = useGetInventory()
  console.log("🚀 ~ file: Inventory.tsx:6 ~ Inventory ~ data:", data)
  return (
    <>
    </>
  );
};

