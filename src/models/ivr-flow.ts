export interface IVRFlowUpdateDto {
  welcomeMessage: string;
  productsUrl: string;
  workingHoursUrl: string;
  customerCarePhoneNumber: string;
}

export interface IVRFlowRequest {
  request: string;
  options: {
    method: string;
    collectResponse: boolean;
  }
}

export interface IVRFlowSay {
  say: string;
}

export interface IVRFlowCollect {
  collectInto: string;
  options: {
    maxInputLength: number;
    sendToReports: string;
    timeout: number;
  }
}

export interface IVRFlowDial {
  dial: string;
  options: {
    senderId: string;
    maxCallDuration: string;
  }
}

export interface IVRFlow {
  description: string;
  name: string;
  script: [
    IVRFlowSay,
    IVRFlowSay,
    IVRFlowCollect,
    {
      "case": {
        "1": [
          IVRFlowRequest,
          IVRFlowSay,
        ],
        "2": [
          IVRFlowRequest,
          IVRFlowSay,
        ],
        "3": [
          IVRFlowSay,
          IVRFlowDial,
        ],
        __default: [
          IVRFlowSay,
        ]
      },
      "switch": string;
    }
  ]
}
