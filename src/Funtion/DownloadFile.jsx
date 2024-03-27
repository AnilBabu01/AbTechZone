import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export const DownloadFile = (url, setProgress) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const filename = lastPart.split('?')[0];

  const filePath = RNFS.DownloadDirectoryPath + `/${filename}`;

  return RNFS.downloadFile({
    fromUrl: url,
    toFile: filePath,
    background: true, // Enable downloading in the background (iOS only)
    discretionary: true, // Allow the OS to control the timing and speed (iOS only)
    progress: res => {
      const progress = (res.bytesWritten / res.contentLength) * 100;
      console.log(`Progress: ${progress.toFixed(2)}%`);

      setProgress(progress);
    },
  })
    .promise.then(response => {
      FileViewer.open(filePath)
        .then(res => {
          console.log(res);
        })
        .catch(e => console.log('Error', e))
        .finally(() => {
          return true;
        });

      setProgress(0);
    })
    .catch(err => {
      console.log('Download error:', err);
    });
};
