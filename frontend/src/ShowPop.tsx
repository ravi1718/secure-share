import React from 'react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import SelectDocument from "./SelectDocument"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover"

const ShowPop = () => {
  return (
    <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Upload Documents</Button>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Upload Documents</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="documentType">Type</Label>
            <SelectDocument />
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">Upload here</Label>
            <Input id="file" type="file" />
    </div>
    <div className="flex justify-end">
          <Button className="bg-blue-600 text-white">Upload</Button>
  </div>
      </div>
    </PopoverContent>
  </Popover>
  )
}

export default ShowPop