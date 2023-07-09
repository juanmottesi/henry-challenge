import { processRanking, processTours } from "@/services/ApiUtils";
import * as axios from "axios";

jest.mock("axios");

describe('processTours', () => {
  it('Empty response', () => {
    const axiosMock = axios.get.mockResolvedValue({ data: { results: [] } });
    expect(axiosMock().then((processTours))).resolves.toHaveLength(0);
  });

  it('With two tours', () => {
    const axiosMock = axios.get.mockResolvedValue({
      data: {
        results: [
          {
            active: 1,
            season_id: 2023,
            tour_id: 1,
            tour_name: 'first',
          },
          {
            active: 1,
            season_id: 2023,
            tour_id: 2,
            tour_name: 'second',
          }
        ]
      },
    });
    expect(axiosMock().then((processTours))).resolves
      .toEqual([
        {
          id: 1,
          name: 'first',
          seasons: [2023],
        },
        {
          id: 2,
          name: 'second',
          seasons: [2023],
        },
    ]);
  });

  it('With two tours buy one of them with 2 seasons', () => {
    const axiosMock = axios.get.mockResolvedValue({
      data: {
        results: [
          {
            active: 1,
            season_id: 2023,
            tour_id: 1,
            tour_name: 'first',
          },
          {
            active: 1,
            season_id: 2023,
            tour_id: 2,
            tour_name: 'second',
          },
          {
            active: 1,
            season_id: 2022,
            tour_id: 1,
            tour_name: 'first',
          },
        ]
      },
    });
    expect(axiosMock().then((processTours))).resolves
      .toEqual([
        {
          id: 1,
          name: 'first',
          seasons: [2023, 2022],
        },
        {
          id: 2,
          name: 'second',
          seasons: [2023],
        },
      ]);
  });
});

describe('processRanking', () => {
  it('Empty response', () => {
    const axiosMock = axios.get.mockResolvedValue({ data: { results: { rankings: [] } } });
    expect(axiosMock().then((processRanking))).resolves.toHaveLength(0);
  });

  it('With two players', () => {
    const axiosMock = axios.get.mockResolvedValue({
      data: {
        results: {
          rankings: [
            {
              movement: 1,
              num_events: 1,
              num_top_tens: 1,
              num_wins: 1,
              player_id: 1,
              player_name: 'first',
              points: '1',
              position: 1,
            },
            {
              movement: 2,
              num_events: 2,
              num_top_tens: 2,
              num_wins: 2,
              player_id: 2,
              player_name: 'second',
              points: '2',
              position: 2,
            },
          ],
        },
      },
    });
    expect(axiosMock().then((processRanking))).resolves
      .toEqual([
        {
          id: 1,
          name: 'first',
          amountTopTens: 1,
          amountWins: 1,
          amountEvents: 1,
          points: '1',
          position: 1,
        },
        {
          id: 2,
          name: 'second',
          amountTopTens: 2,
          amountWins: 2,
          amountEvents: 2,
          points: '2',
          position: 2,
        },
      ]);
  });
});
