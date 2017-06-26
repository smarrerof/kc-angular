export class State {

  static fromJsonToList(json: any[]): State[] {
    return json.reduce((states: State[], state: any) => {
      states.push(State.fromJson(state));
      return states;
    }, []);
  }

  static fromJson(json: any): State {
    return new State(
      json.id,
      json.name
    );
  }

  constructor(
    public id: string,
    public name: string) { }

}