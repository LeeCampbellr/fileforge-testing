import "dotenv/config";

import fs from "fs";
import { FileforgeClient } from "@fileforge/client";
import { compile } from "@fileforge/react-print";
import React from "react";

import { Document } from "./Document";

const ff = new FileforgeClient({
  apiKey: process.env.FILEFORGE_API_KEY,
});

(async () => {
  try {
    const HTML = await compile(<Document />);

    const pdf = await ff.pdf.generate(
      [
        new File([HTML], "index.html", {
          type: "text/html",
        }),
        new File(
          [fs.readFileSync(__dirname + "/fonts/PPNeueMontreal-Medium.ttf")],
          "PPNeueMontreal-Medium.ttf",
          {
            type: "font/ttf",
          }
        ),
        new File(
          [fs.readFileSync(__dirname + "/fonts/PPNeueMontreal-Regular.ttf")],
          "PPNeueMontreal-Regular.ttf",
          {
            type: "font/ttf",
          }
        ),
      ],
      {
        options: {
          host: false,
          test: false,
        },
      }
    );

    pdf.pipe(fs.createWriteStream("output.pdf"));
  } catch (error) {
    console.error("Error during PDF conversion:", error);
  }
})();
