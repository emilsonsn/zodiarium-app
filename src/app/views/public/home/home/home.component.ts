import {Component} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  options: AnimationOptions = {
    path: '/assets/animation/Animation - 1732981560314.json',
  };

  itemPublic: { icon: string, title: string, description: string }[] = [
    {
      icon: "fa-solid fa-house",
      title: "Orientação individual",
      description: "Receba conselhos personalizados dos nossos consultores especialistas, adaptados ao seu mapa astrológico."
    },
    {
      icon: "fa-solid fa-file-lines",
      title: "Leitura astrológica personalizada",
      description: "Obtenha uma leitura detalhada que destaca o seu perfil astrológico e a sua influência na sua vida e relações."
    },
    {
      icon: "fa-solid fa-lightbulb",
      title: "Compreensão mais profunda de si mesmo",
      description: "Explore as profundezas da sua personalidade, forças, fraquezas e tendências inatas para promover crescimento pessoal e desenvolvimento."
    },
    {
      icon: "fa-solid fa-heart",
      title: "Padrões de relacionamento reveladores",
      description: "Descubra os padrões que regem os seus relacionamentos e desvende as subtilezas das suas necessidades emocionais e sexuais."
    },
  ];
  itemBenefiting: { title: string, description: string }[] = [
    {
      title: "20 milhões",
      description: "utilizadores satisfeitos"
    },
    {
      title: "93% de precisão",
      description: "avaliado por utilizadores reais"
    },
    {
      title: "4.7/5 estrelas",
      description: "pontuação de satisfação"
    },
    {
      title: "300+ consultores",
      description: "rigorosamente testados"
    },
  ];

  itemComment: { username: string, date: Date, comment: string, rating: number }[] = [
    {
      username: "joaquim_silva07",
      date: new Date(),
      comment: "O Nebula me ajudou a entender melhor o meu relacionamento e a minha personalidade. Recomendo muito!",
      rating: 5
    },
    {
      username: "ana_martins85",
      date: new Date(),
      comment: "Achei a aplicação interessante, mas alguns detalhes poderiam ser melhorados. No geral, é útil.",
      rating: 3
    },
    {
      username: "carlos_almeida22",
      date: new Date(),
      comment: "Fantástico! Nunca pensei que fosse aprender tanto sobre mim mesmo. Merece cinco estrelas!",
      rating: 5
    },
    {
      username: "maria_sousa93",
      date: new Date(),
      comment: "Boa experiência, mas penso que algumas funcionalidades ainda estão um pouco confusas.",
      rating: 4
    }
  ];


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
