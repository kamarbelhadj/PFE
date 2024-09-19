const officeExts = [
  "doc",
  "dot",
  "docx",
  "dotx",
  "docm",
  "dotm",
  "xls",
  "xlt",
  "xla",
  "xlsx",
  "xltx",
  "xlsm",
  "xltm",
  "xlam",
  "xlsb",
  "ppt",
  "pot",
  "pps",
  "ppa",
  "pptx",
  "potx",
  "ppsx",
  "ppam",
  "pptm",
  "potm",
  "ppsm",
];

const officeMimeTypes = [
  "application/msword",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "application/vnd.ms-word.document.macroenabled.12",
  "application/vnd.ms-word.template.macroenabled.12",
  "application/vnd.ms-excel",
  "application/vnd.ms-excel",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  "application/vnd.ms-excel.sheet.macroenabled.12",
  "application/vnd.ms-excel.template.macroenabled.12",
  "application/vnd.ms-excel.addin.macroenabled.12",
  "application/vnd.ms-excel.sheet.binary.macroenabled.12",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.template",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "application/vnd.ms-powerpoint.addin.macroenabled.12",
  "application/vnd.ms-powerpoint.presentation.macroenabled.12",
  "application/vnd.ms-powerpoint.template.macroenabled.12",
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
];

const pdfExts = ["pdf"];
const pdfMiMeTypes = ["application/pdf"];
const videoExts = ["mp4", "avi"];
const videoMeTypes = ["video/mp4", "video/x-msvideo"];
const imageExts = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'webp',
];
const imageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
];
export const ext = [...pdfExts, ...videoExts, ...officeExts, ...imageExts];
export const mimeTypes = [...pdfMiMeTypes, ...videoMeTypes, ...officeMimeTypes, ...imageMimeTypes];
