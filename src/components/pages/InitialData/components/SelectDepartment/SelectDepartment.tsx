import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectDepartment = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Выберите филиал" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="primorskoe">Приморское ЛПУМГ</SelectItem>
      </SelectContent>
    </Select>
  );
};
