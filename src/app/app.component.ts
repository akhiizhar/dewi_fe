// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
//   standalone: false,
// })
// export class AppComponent {
//   constructor() {}
// }

import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  ngOnInit() {
    // Jangan jalankan plugin langsung — delay dulu sedikit
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.safeInitPlugins();
      }, 1000); // 1 detik untuk jaga-jaga
    });
  }

  safeInitPlugins() {
    try {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#3f51b5' });
      StatusBar.setOverlaysWebView({ overlay: false });

      Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
    } catch (err) {
      console.error('[Plugin Init Error]', err);
    }
  }
}

// trial keyboard
// npm install @capacitor/keyboard
// npx cap sync

// import { Component } from '@angular/core';
// import { Platform } from '@ionic/angular';
// import { StatusBar, Style } from '@capacitor/status-bar';
// import { Keyboard, KeyboardResize } from '@capacitor/keyboard';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
//   standalone: false,
// })
// export class AppComponent {
//   constructor(private platform: Platform) {
//     this.initializeApp();
//   }

//   initializeApp() {
//     this.platform.ready().then(() => {
//       // ✅ Atur status bar
//       StatusBar.setStyle({ style: Style.Dark });
//       StatusBar.setBackgroundColor({ color: '#3f51b5' });
//       StatusBar.setOverlaysWebView({ overlay: false });

//       // ✅ Atur keyboard agar input tidak ketutup
//       Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
//     });
//   }
// }
