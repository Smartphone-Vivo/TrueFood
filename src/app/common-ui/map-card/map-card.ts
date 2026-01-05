import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';

declare const ymaps3: any;

@Component({
  selector: 'app-map-card',
  imports: [
    TuiAppearance,
    TuiCardLarge
  ],
  templateUrl: './map-card.html',
  styleUrl: './map-card.scss',
})
export class MapCard implements OnInit, OnDestroy {
  private map: any;



  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.initMap();
  }

  ngOnDestroy(): void {
    // Очищаем карту при уничтожении компонента
    if (this.map) {
      // Проверяем, есть ли метод destroy у карты
      if (typeof this.map.destroy === 'function') {
        this.map.destroy();
      }
    }
  }

  private async initMap(): Promise<void> {

    // Конфигурация карты
    let LOCATION = {
      center: [39.1538, 51.7070] as [number, number],
      zoom: 15
    };

      // Ждем загрузки API Яндекс Карт
      if (typeof ymaps3 === 'undefined') {
        console.error('Yandex Maps API не загружен. Проверьте подключение скрипта в index.html');
        return;
      }

      await ymaps3.ready;

      // Теперь ymaps3 доступен
      const { YMap, YMapDefaultSchemeLayer } = ymaps3;

      // Ищем контейнер для карты
      const container = document.getElementById('map-container');

      // Создаем карту
      this.map = new YMap(
          container,
          {
            location: LOCATION
          }
      );

      this.map.addChild(new YMapDefaultSchemeLayer());

      console.log('Карта успешно инициализирована');

  }
}
