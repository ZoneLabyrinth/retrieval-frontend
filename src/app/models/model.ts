export class Types {
  id: number;
  name: string;
}


export class Sources {
  id: number;
  title: string;
  content: [{ name: string; }];
}

export class Sentiment {
  id: string;
  title: string;
  url: string;
  time: string;
}

export class Mapping {
  keywords: string;
}

export class InnovativeMapping {
  description: string;
}

export class Innovative {
  fileName: string;
  content: string;
}

// export class Model {
//   Types: Types;
//   Sources: Sources;
//   Sentiment: Sentiment;
//   Mapping: Mapping;
// }
