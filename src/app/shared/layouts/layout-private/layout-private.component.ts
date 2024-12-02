import {Component, ElementRef, Renderer2} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {User} from "@models/user";
import {UserService} from "@services/user.service";
import {SessionService} from '@store/session.service';
import {SessionQuery} from '@store/session.query';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { IMenuItem } from '@models/ItemsMenu';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrl: './layout-private.component.scss'
})
export class LayoutPrivateComponent {
  titleProcess: string = '';

  public menuItem: IMenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-house',
      route: '/painel/home',
      active: true
    },
    {
      label: 'Cliente',
      icon: 'fa-solid fa-users',
      route: '/painel/client',
      active: true
    },
    {
      label: 'Leads',
      icon: 'fa-solid fa-user',
      route: '/painel/lead',
      active: true
    },
    {
      label: 'Produtos',
      icon: 'fa-brands fa-product-hunt',
      route: '/painel/product',
      active: true
    },
    {
      label: 'Configurações',
      icon: 'fa-solid fa-gears',
      route: '/painel/setting'
    },
  ]

  protected isMobile: boolean = window.innerWidth >= 1000;
  private resizeSubscription: Subscription;
  user: User;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _sidebarService: SidebarService,
    private readonly _sessionQuery: SessionQuery
  ) {
  }


  ngOnInit(): void {
    this._sessionQuery.user$.subscribe(user => {
      this.user = user;
    })
    document.getElementById('template').addEventListener('click', () => {
      this._sidebarService.retractSidebar();
    });



    // Escuta as mudanças nos queryParams diretamente
    this._activatedRoute.queryParams.subscribe(params => {
      this.titleProcess = params['title_process'];
    });
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}
