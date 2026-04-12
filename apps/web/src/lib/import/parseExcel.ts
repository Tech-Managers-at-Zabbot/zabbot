import * as XLSX from "xlsx";

export async function parseExcel(file: File) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const getSheet = (name: string) => {
    const sheet = workbook.Sheets[name];
    return sheet ? XLSX.utils.sheet_to_json(sheet) : [];
  };

  return {
    journeys: getSheet("Journeys"),
    sparks: getSheet("Sparks"),
    contentBlocks: getSheet("ContentBlocks"),
    exercises: getSheet("Exercises"),
    vocabulary: getSheet("Vocabulary"),
  };
}