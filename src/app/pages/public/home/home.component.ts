import { Component, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpertCardComponent } from '../../../shared/components/expert-card/expert-card.component';
import { TestimonialCardComponent } from '../../../shared/components/testimonial-card/testimonial-card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExpertCardComponent,
    TestimonialCardComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  experts = [
    { 
      name: 'Émilie Durand', 
      role: 'Marketing', 
      image: 'assets/images/experts/marc.jpg' 
    },
    { 
      name: 'Marc Lefevre', 
      role: 'Gestion de projet', 
      image: 'assets/images/experts/marc.jpg' 
    },
    { 
      name: 'Nathalie Robert', 
      role: 'Ressources humaines', 
      image: 'assets/images/experts/marc.jpg' 
    },
    { 
      name: 'Jean Dupont', 
      role: 'Développement', 
      image: 'assets/images/experts/marc.jpg' 
    },
    { 
      name: 'Sophie Martin', 
      role: 'Design', 
      image: 'assets/images/experts/marc.jpg' 
    }
  ];

  testimonials = [
    { 
      author: 'Caroline Martin', 
      text: 'La formation était très complète et instructive.', 
      image: 'assets/images/testimonials/marc.jpg' 
    },
    { 
      author: 'Thomas Dubois', 
      text: 'Compétences directement applicables en entreprise.', 
      image: 'assets/images/testimonials/marc.jpg' 
    },
    { 
      author: 'Émilie Dubois', 
      text: 'Un excellent programme avec des formateurs experts.', 
      image: 'assets/images/testimonials/marc.jpg' 
    },
    { 
      author: 'Pierre Lambert', 
      text: 'Contenu très pertinent pour mon développement professionnel.', 
      image: 'assets/images/testimonials/marc.jpg' 
    },
    { 
      author: 'Lucie Moreau', 
      text: 'Flexibilité parfaite pour concilier formation et travail.', 
      image: 'assets/images/testimonials/marc.jpg' 
    }
  ];

  private expertSwiper: Swiper | undefined;
  private testimonialSwiper: Swiper | undefined;

  constructor(
    private renderer: Renderer2,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initHoverEffects();
  }

  ngAfterViewInit(): void {
    this.initSwipers();
    this.setupScrollAnimations();
  }

  private initSwipers(): void {
    this.expertSwiper = new Swiper('.experts-swiper', {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }
    });

    this.testimonialSwiper = new Swiper('.testimonials-swiper', {
      modules: [Navigation, Autoplay],
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }

  private initHoverEffects(): void {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
      this.renderer.listen(card, 'mouseenter', () => {
        this.renderer.addClass(card, 'hover-active');
        this.renderer.setStyle(card, 'transform', 'translateY(-5px)');
        this.renderer.setStyle(card, 'box-shadow', '0 10px 20px rgba(0,0,0,0.15)');
      });

      this.renderer.listen(card, 'mouseleave', () => {
        this.renderer.removeClass(card, 'hover-active');
        this.renderer.setStyle(card, 'transform', 'translateY(0)');
        this.renderer.setStyle(card, 'box-shadow', '0 4px 12px rgba(0,0,0,0.1)');
      });
    });
  }

  private setupScrollAnimations(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'animate__animated');
          this.renderer.addClass(entry.target, 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' 
    });

    document.querySelectorAll('.feature-card, .swiper-slide')
      .forEach(el => observer.observe(el));
  }
}