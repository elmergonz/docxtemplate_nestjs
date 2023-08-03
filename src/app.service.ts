import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import PizZip from 'pizzip';
import { v4 } from 'uuid';
export interface ComposeResult {
  filePath: string;
  fileName: string;
  buf?: Buffer;
}

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${__dirname}`;
  }

  async compose(): Promise<ComposeResult> {
    // Load the docx file as binary content
    const content = await readFile(
      resolve(__dirname, 'tag-example.docx'),
      // resolve('C:/Users/egotano/projects/nodejs/docxtemplate_nestjs', 'tag-example.docx'),
      'binary',
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      first_name: 'John',
      last_name: 'Doe',
      phone: '0652455478',
      description: 'New Website',
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: 'DEFLATE',
    });

    const fileName = `output-${v4()}`;
    const filePath = resolve(__dirname, 'out');
    // const filePath = resolve('C:/Users/egotano/projects/nodejs/docxtemplate_nestjs', 'out');
    const fullPath = resolve(filePath, `${fileName}.docx`);

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    await writeFile(fullPath, buf);

    return {
      filePath: fullPath,
      fileName,
      // pdf: pdf
    };
  }
}
