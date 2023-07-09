import { AxiosResponse } from "axios";

export type TourApi = {
  active: number;
  season_id: number;
  tour_id: number;
  tour_name: string;
};

export interface ToursApi {
  results: TourApi[];
};

export type Tour = {
  id: number;
  name: string;
  seasons: number[];
};

export type Tours = Tour[];

export const processTours = (response: AxiosResponse<ToursApi>) => {
  const tours = response.data.results;
  return tours.reduce((result: Tours, tour) => {
    const findedTour = result.find((element) => element.id === tour.tour_id);
    if (findedTour) {
      findedTour.seasons = [...findedTour.seasons, tour.season_id];
      return result;
    }
    return [...result, { id: tour.tour_id, name: tour.tour_name, seasons: [tour.season_id] }]
  }, []);
};

export type PlayerApi = {
  movement: number;
  num_events: number;
  num_top_tens: number;
  num_wins: number;
  player_id: number;
  player_name: string;
  points: string;
  position: number;
};

export interface RankingApi {
  results: {
    rankings: PlayerApi[];
  }
};

export type Player = {
  id: number;
  name: string;
  amountTopTens: number;
  amountWins: number;
  amountEvents: number;
  points: string;
  position: number;
};

export type Ranking = Player[];

export const processRanking = (response: AxiosResponse<RankingApi>): Ranking => {
  return response.data.results.rankings.map(({
    player_id: id,
    player_name: name,
    num_top_tens: amountTopTens,
    num_wins: amountWins,
    num_events: amountEvents,
    position,
    points,
   }) => ({
      id,
      name,
      amountTopTens,
      amountWins,
      amountEvents,
      points,
      position,
  }));
};
