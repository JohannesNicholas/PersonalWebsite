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

    var paths : SVGPathElement[] = [];
    this.pathElems!.forEach(pathElem => {
      paths.push(pathElem.nativeElement);
    });


    //get the longest path length
    var longestPath = 0;
    paths.forEach(path => {
      if (path.getTotalLength() > longestPath) {
        longestPath = path.getTotalLength();
      }
    });

    paths.forEach(path => {
      path.style.strokeDasharray = longestPath + ' ' + longestPath;
      path.style.strokeDashoffset = longestPath.toString();
    })

    

    

    window.addEventListener('scroll', () => {
      var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      paths.forEach(path => {
        var drawLength = longestPath * scrollPercentage;
        path.style.strokeDashoffset = (longestPath - drawLength).toString();
      })
    })

  }
  

}
