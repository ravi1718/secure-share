
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"

const SelectDocument = () => {
  return (
    <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a Documents" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Documents</SelectLabel>
        <SelectItem value="Education">Education</SelectItem>
        <SelectItem value="Govt-Identity">Govt-Identity</SelectItem>
        <SelectItem value="Travel">Travel</SelectItem>
        <SelectItem value="Health">Health</SelectItem>
        <SelectItem value="Financial">Financial</SelectItem>
        <SelectItem value="Property">Property</SelectItem>
        <SelectItem value="Other">Other</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default SelectDocument