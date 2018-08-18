import * as React from "react";
import { connect } from "react-redux";

import { setNumberOfTeams } from "../store/actions/teams";
import { IStoreState } from "../store/store";
import { ITeam } from "../Team";
import "./OrderTracker.css";

interface IProps {
  activeTeam: number;
  currentPick: number;
  numberOfTeams: number;
  setNumberOfTeams: (numberOfTeams: number) => void;
  teams: ITeam[];
}

const initialState = {
  cardLength: 50
};
type State = Readonly<typeof initialState>;

class OrderTracker extends React.Component<IProps, State> {
  public readonly state: State = initialState;

  constructor(props: any) {
    super(props);

    this.state = { ...initialState, cardLength: this.getCardLength() };
    window.addEventListener("resize", () =>
      this.setState({ cardLength: this.getCardLength() })
    );
  }

  public render() {
    const { activeTeam, currentPick, numberOfTeams, teams } = this.props;
    const { cardLength } = this.state;

    // amount to shift the "current draft" arrow from the left
    const currentPickLeft = activeTeam * (cardLength + 16) + 0.2 * cardLength;

    // an array with the allowable number of teams: [6, 16]
    const allowableNumberOfTeams =
      currentPick > numberOfTeams
        ? // freeze the number of teams at the value set in store, can't change any longer
          [numberOfTeams]
        : // allow the user to add teams, so long as the new team count is greater than
          // the number of picks that have already happened
          Array.from(new Array(11))
            .fill(0)
            .map((_, i) => i + 6)
            .filter(n => n > currentPick);

    return (
      <div className="OrderTracker">
        <header>
          <h3>TEAMS</h3>

          <div className="Select-Container">
            <select
              value={`${numberOfTeams} Teams`}
              disabled={currentPick > numberOfTeams}
              onChange={this.setNumberOfTeams}
            >
              {allowableNumberOfTeams.map(n => (
                <option key={`${n}-Teams-Select`}>{`${n} Teams`}</option>
              ))}
            </select>
          </div>
        </header>

        <div className="Team-Cards">
          {teams.map((t, i) => (
            <div
              className={`Card ${
                i === activeTeam ? "Card-Active" : "Card-Empty"
              }`}
              key={i}
              style={{ width: cardLength, height: cardLength }}
            >
              <h4>{i + 1}</h4>
              <p className="points">{t.StarterValue}</p>
            </div>
          ))}
        </div>
        <div className="Team-Arrow-Up" style={{ left: currentPickLeft }} />
        <p
          className="Team-Arrow-Label small"
          style={{ left: currentPickLeft + 21 }}
        >
          Current
        </p>
      </div>
    );
  }

  private getCardLength = (): number => {
    const thisWidth = window.innerWidth * 0.65 - 200; // ~30px padding, 70% width of total window size
    return Math.floor(thisWidth / this.props.numberOfTeams) - 8; // 8 == 2px border, 6px margin
  };

  private setNumberOfTeams = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const numberOfTeams = value.split(" ")[0];
    this.props.setNumberOfTeams(+numberOfTeams);
  };
}

const mapStateToProps = ({
  activeTeam,
  currentPick,
  numberOfTeams,
  teams
}: IStoreState) => ({
  activeTeam,
  currentPick,
  numberOfTeams,
  teams
});

const mapDispatchToProps = (dispatch: any) => ({
  setNumberOfTeams: (numberOfTeams: number) =>
    dispatch(setNumberOfTeams(numberOfTeams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTracker);
