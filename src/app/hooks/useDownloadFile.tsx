import { useState } from "react";

interface DownloadFileProps {
  readonly apiDefinition: () => Promise<Blob>;
  readonly preDownloading?: () => void;
  readonly postDownloading?: () => void;
  readonly onError?: () => void;
  readonly getFileName: () => string;
}

interface DownloadedFileInfo {
  readonly download: () => Promise<void>;
  readonly name: string | undefined;
  readonly url: string | undefined;
}

export const useDownloadFile = ({
  apiDefinition,
  getFileName,

  preDownloading,
  postDownloading,
  onError,
}: DownloadFileProps): DownloadedFileInfo => {
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();

  const download = async (): Promise<void> => {
    try {
      preDownloading && preDownloading();
      const data = await apiDefinition();
      const url = URL.createObjectURL(new Blob([data]));

      setFileUrl(url);
      setFileName(getFileName());

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", getFileName());

      document.body.appendChild(link);

      link.click();
      link.parentNode?.removeChild(link);

      postDownloading && postDownloading();

      URL.revokeObjectURL(url);
    } catch (error) {
      onError && onError();
    }
  };

  return { download, url, name };
};
