import { GEMINI_KEY } from "../constants/constants";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default ai;
