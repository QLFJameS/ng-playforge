import { ReturnStatement } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:9090/game/new';
  private apiUrlGameGenres = 'http://localhost:9090/game/associate-genres';
  private apiUrlAllGames = 'http://localhost:9090/game/AllGames'
  constructor() { }

  sendGameData(gameData: any): Promise<any> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi des données : ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
      });
  }

  associateGameWithGenres(gameId: number, genreIds: number[]): Promise<any> {
    const associations = genreIds.map(genreId => {
      return { gameId, genreId };
    });
    return fetch(this.apiUrlGameGenres, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(associations)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi des données : ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
      });
  }

  async getAllGames(): Promise<any> {
    try {

      const response = await fetch(this.apiUrlAllGames, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des jeux : ' + response.statusText);
      };

      const data = await response.json();
      return data;

    } catch (error) {
      console.log('ici le probleme')
      console.error('Erreur:', error);
      throw error;
    }
  }
}


