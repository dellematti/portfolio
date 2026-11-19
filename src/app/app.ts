import { Component, HostListener, signal } from '@angular/core';

export interface Photo {
  id: number;
  url: string;
  title: string;
  category: string;
  location: string;
  camera: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Dati fittizi modificabili del fotografo
  photographer = {
    name: 'Amore Pipipi',
    role: 'Editorial & Documentary Photographer',
    bio: 'Racconto storie visive attraverso luce naturale, architetture silenziose e ritratti spontanei. Basato a Milano, disponibile per incarichi editoriali e commerciali in tutta Europa.',
    email: 'ciao@ciao.it',
    instagram: 'https://instagram.com'
  };

  // Foto di esempio ad alta risoluzione (da sostituire poi con le tue)
  photos: Photo[] = [
    {
      id: 1,
      //url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      url : 'https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1wbGF0Zm9ybS1ob3N0aW5nIiwia2V5Ijoid2Vic2l0ZXMvcGxhbmV0LXpvby0yL2FuaW1hbHMvZTAxYjQzYzkvTWVlcmthdC5qcGciLCJlZGl0cyI6eyJ3ZWJwIjp7InF1YWxpdHkiOjg1fSwidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxOTIwLCJmaXQiOiJjb250YWluIn0sInZlcnNpb24iOiJiYzAyODM4ZC04MTgwLTQ4YzMtODMzOC1hMzU3NTY5NGMyZDcifX0=',
      title: 'Silence in the Valley',
      category: 'Landscape',
      location: 'Yosemite, USA',
      camera: 'Leica Q2 · 28mm f/1.7'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      title: 'Golden Hour Portrait',
      category: 'Portrait',
      location: 'Milano, Italia',
      camera: 'Sony A7R IV · 85mm f/1.4'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      title: 'Minimalist Geometry',
      category: 'Architecture',
      location: 'Berlino, Germania',
      camera: 'Fujifilm X100V · 23mm f/2'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
      title: 'Neon Rain',
      category: 'Street',
      location: 'Tokyo, Giappone',
      camera: 'Ricoh GR IIIx · 40mm f/2.8'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      title: 'Morning Mist',
      category: 'Landscape',
      location: 'Dolomiti, Italia',
      camera: 'Hasselblad X2D · 55mm'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      title: 'Character Study',
      category: 'Portrait',
      location: 'Londra, UK',
      camera: 'Canon R5 · 50mm f/1.2'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      title: 'Glass & Steel',
      category: 'Architecture',
      location: 'New York, USA',
      camera: 'Leica M11 · 35mm Summilux'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      title: 'Starlight Ridge',
      category: 'Landscape',
      location: 'Alpi Svizzere',
      camera: 'Sony A7S III · 24mm f/1.4'
    }
  ];

  // Gestione stato del Lightbox tramite Angular Signals
  selectedIndex = signal<number | null>(null);

  get selectedPhoto(): Photo | null {
    const idx = this.selectedIndex();
    return idx !== null ? this.photos[idx] : null;
  }

  openLightbox(index: number): void {
    this.selectedIndex.set(index);
    document.body.style.overflow = 'hidden'; // Blocca lo scroll sotto
  }

  closeLightbox(): void {
    this.selectedIndex.set(null);
    document.body.style.overflow = 'auto';
  }

  nextPhoto(event?: Event): void {
    event?.stopPropagation();
    const current = this.selectedIndex();
    if (current !== null) {
      this.selectedIndex.set((current + 1) % this.photos.length);
    }
  }

  prevPhoto(event?: Event): void {
    event?.stopPropagation();
    const current = this.selectedIndex();
    if (current !== null) {
      this.selectedIndex.set((current - 1 + this.photos.length) % this.photos.length);
    }
  }

  // Navigazione da tastiera (ESC, Freccia Destra, Freccia Sinistra)
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.selectedIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.nextPhoto();
    if (event.key === 'ArrowLeft') this.prevPhoto();
  }
}