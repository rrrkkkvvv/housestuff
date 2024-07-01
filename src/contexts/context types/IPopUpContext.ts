export interface ShowPopUpFnType {
    type: string,
    text: string,
}

export interface IPopUpContextValue {
    popUpBgRed: boolean,
    popUpText: string,
    showPopUp: boolean,
    showPopUpFn: ({ type, text }: ShowPopUpFnType) => void,

}