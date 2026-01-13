"use client";

import { useForm } from "@tanstack/react-form";
import React from "react";
import { Button } from "@/components/ui/button";
import createConfigFile from "@/lib/actions/create-config-file";

export default function CreateConfig() {
  const form = useForm({
    defaultValues: {},
  });

  const [log, setLog] = React.useState("");

  async function handleClick() {
    const res = await createConfigFile();
    console.log(res);
    setLog(res.message);
  }

  return (
    <div>
      <Button onClick={() => handleClick()} className="w-fit">
        Create Config
      </Button>

      <div>
        <h1>Logs</h1>
        <p>{log}</p>
      </div>
    </div>
  );
}
