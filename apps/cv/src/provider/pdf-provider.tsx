"use client";

import { CVSchemaValue } from "@/schemas/cv/index";
import { RawUserMetaData } from "@packages/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface InitialPDFDataProps {
  initialData: CVSchemaValue & {
    user: {
      raw_user_meta_data: RawUserMetaData;
    };
  };
}

export interface PDFProviderProp extends InitialPDFDataProps {
  setCvValue: Dispatch<SetStateAction<InitialPDFDataProps>>;
}

export const PDFContext = createContext<PDFProviderProp | undefined>(undefined);

export const PDFProvider: React.FC<{
  children: ReactNode;
  initialData: InitialPDFDataProps["initialData"];
}> = ({ children, initialData }) => {
  const [value, setCvValue] = useState<InitialPDFDataProps>({
    initialData: {
      ...initialData,
    },
  });

  useEffect(() => {
    setCvValue({ initialData: { ...initialData } });
    console.log("======= PDFProvider useEffect =======", value);
  }, [initialData]);

  return (
    <PDFContext.Provider value={{ ...value, setCvValue }}>
      {children}
    </PDFContext.Provider>
  );
};

export const usePDF = () => {
  const context = useContext(PDFContext);

  if (context === undefined) {
    throw new Error("usePDF must be used within a PDFProvider");
  }

  return context;
};
