export type BaseSheetRow = Record<string, any>;

export type SheetInput = {
  journeys?: BaseSheetRow[];
  sparks?: BaseSheetRow[];
  contentBlocks?: BaseSheetRow[];
  exercises?: BaseSheetRow[];
  vocabulary?: BaseSheetRow[];
};