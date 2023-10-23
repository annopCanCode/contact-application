import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { Subject } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listData!: any[];
  listenerFn!: () => void;


  constructor(private contactService: ContactService,
              private renderer: Renderer2,
              private route: Router){}

  ngOnInit(): void {
    this.dtOptions={
      pagingType: 'simple_numbers',
        serverSide: false,
        processing: true,
        responsive: true,
        ordering: true,
        orderMulti: false,
        searching: false,
        scrollCollapse: true,
        paging: false,
        info: false,
        ajax: (dataTablesParameters: any, callback) => {
          let pageNum = 0;
          let recordsFilteredNum = 0;
          let contactSource: any = [];

          if (dataTablesParameters.start !== 0) {
            pageNum = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          }
            this.contactService.getContacts().subscribe((res: any) => {
              if(res != null){
                for(let x of res){
                  contactSource.push({
                    id: x.id,
                    name: x.name,
                    username: x.username,
                    email: x.email,
                    address: x.address.city,
                    phone: x.phone,
                    website: x.website,
                    company: x.company
                  })
                }
                this.listData = res;
              }
              recordsFilteredNum = res.length;
              callback({
                data: contactSource,
                draw: dataTablesParameters.draw,
                recordsFiltered: recordsFilteredNum,
                recordsTotal: res.length
              });
            });
          },
        order: [],
        columns: [
          {data: 'name'},
          {data: 'email'},
          {data: 'address'},
          {data: 'phone'},
          {data: 'id', 
            orderable: false,
            render: function(data, type, row, meta){
              return `<style>
                .btn{
                  background: #007bff;
                  color: white;
                  font-family: Roboto,"Helvetica Neue",sans-serif;
                  font-size: 14px;
                  font-weight: 500;
                }
              </style>
                <button class="btn" id="${row.id}">Details</button>`;
            }
        }
        ],
        language: {
          paginate: {
            first: '',
            previous: '◄',
            next: '►',
            last: ''
          },
          emptyTable: "No records found"
        },
        columnDefs:[
          { targets: [0], width: '25%'},
          { targets: [1], width: '25%'},
          { targets: [2], width: '25%'},
          { targets: [3], width: '25%'},
          { targets: [4], width: '25%'}
        ]
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
    this.listenerFn = this.renderer.listen('document', 'click', (event) => {
      if(event.target.classList.contains('btn')){
        this.route.navigate(['/details', event.target.id]);
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
      if(this.listenerFn){
        this.listenerFn();
      }
  }
}
