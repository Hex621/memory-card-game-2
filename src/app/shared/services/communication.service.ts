import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Card } from './../../shared/models/card';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CardStates } from '../models/enums/card-states';
import { CardRarities } from '../models/enums/card-rarities';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  cardStates = CardStates;
  cardRarity = CardRarities;

  constructor(private http: HttpClient) { }

  getResponseFromUrl(url: string) {
    return firstValueFrom(this.http.get(url));
  }

  extractCardsFromJSON(jsonData,amount?:number) {
    let count = 0;
    let cards:Card[] = [];
    if(jsonData != undefined) {
      jsonData['posts'].forEach(post=> {
        count++;
        if (count <= (amount? amount : 100)) {
          let card : Card = {
            id: post['id'],
            imageUrl: post['file']['url'],
            state: CardStates.default,
            source: "https://e621.net/posts/"+post['id'],
            timesFlipped: 0,
            value: 10,
            rarity: this.cardRarity.Common,
            special: "",
            modified: ""
          }
          cards.push(card);
      }
      });
    }
    return cards;

  }

  doubleArray(array: any[]) {
    let newArray : any[] = [];
    array.forEach( e => {
      newArray.push({...e});
      newArray.push({...e});
    } )
    return newArray;
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

}
