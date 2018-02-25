import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../models/widget.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {UserService} from '../../../services/user.service.client';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  name: String;
  userId: String;
  webId: String;
  pgId: String;
  wdgId: String;
  size: String;
  text: String;
  width: String;
  url: String;
  wdgs: Widget[];
  widget: Widget;

  constructor(private wdgservice: WidgetService,
              private pageservice: PageService,
              private webservice: WebsiteService,
              private userservice: UserService,
              private route: ActivatedRoute) { }

  updateWidget(type, size, text, width, url) {
    this.wdgservice.updateWidget(this.wdgId,
      new Widget(this.wdgId,
        type,
        this.pgId,
        size,
        text,
        width,
        url));
    const username = this.userservice.findUserById(this.userId).username;
    const webname = this.webservice.findWebsitesById(this.webId);
    const pgname = this.pageservice.findPageById(this.pgId);
    alert('Widget of type ' + type + ' updated successfully for Page \'' + pgname +
      '\' of user ' + '\'' + username + '\'' + ' in website ' + '\'' + webname + '\'');
  }

  deleteWidget() {
    const webname = this.webservice.findWebsitesById(this.webId).name;
    const username = this.userservice.findUserById(this.userId).username;
    const pgname = this.pageservice.findPageById(this.pgId);
    const type = this.wdgservice.findWidgetById(this.wdgId).widgetType;
    this.wdgservice.deleteWidget(this.wdgId);
    alert('Widget of type ' + type + ' deleteted successfully for Page \'' + pgname +
      '\' of user ' + '\'' + username + '\'' + ' in website ' + '\'' + webname + '\'');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.webId = params['webId'];
      this.pgId = params['pageId'];
      this.wdgId = params['wdgId'];
      this.wdgs = this.wdgservice.findWidgetsByPageId(this.pgId);
    });
  }
}