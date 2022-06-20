import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {
  
  title = 'PersonalWebsite';

  @ViewChild('branchpath') pathElem: any;

  @ViewChildren('branchpath') pathElems: QueryList<any> | undefined;



  ngAfterViewInit(): void {
    var path : SVGPathElement = this.pathElem.nativeElement;
    var pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength.toString();

    window.addEventListener('scroll', () => {
      var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      var drawLength = pathLength * scrollPercentage;
      path.style.strokeDashoffset = (pathLength - drawLength).toString();
    })

  }
  

}
