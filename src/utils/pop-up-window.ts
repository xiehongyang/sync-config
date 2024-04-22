import {useCallback} from "react";

export const popupWindow = (url: string, windowName: string, w: number, h: number) => {
    const y = window.top!.outerHeight / 2 + window.top!.screenY - (h / 2);
    const x = window.top!.outerWidth / 2 + window.top!.screenX - (w / 2);
    return window.open(url, windowName, `target=_blank, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
};