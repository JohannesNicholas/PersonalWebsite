import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {
  
  title = 'PersonalWebsite';

  @ViewChild('leavesGroup') leavesGroup: any;
  @ViewChild('importantTextGroup') importantTextGroup: any;
  @ViewChild('nonImportantTextGroup') nonImportantTextGroup: any;
  @ViewChild('socialsGroup') socialsGroup: any;

  @ViewChildren('branchpath') pathElems: QueryList<any> | undefined;



  ngAfterViewInit(): void {


    this.leavesGroup.nativeElement.style.opacity = 0;
    this.importantTextGroup.nativeElement.style.opacity = 0;
    this.nonImportantTextGroup.nativeElement.style.opacity = 0;
    this.socialsGroup.nativeElement.style.opacity = 0;



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

    

    
    //on scroll change
    window.addEventListener('scroll', () => {
      var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      
      //branches
      var drawLength = longestPath - longestPath * Math.min(scrollPercentage / 0.5, 1);
      //drawLength = Math.max(drawLength, longestPath)
      paths.forEach(path => {
        path.style.strokeDashoffset = drawLength.toString();
      })

      console.log({scrollPercentage});

      //leaves
      if (scrollPercentage > 0.6){
        var opacity = Math.min((scrollPercentage - 0.6) / 0.3, 1)
        this.leavesGroup.nativeElement.style.opacity = opacity;
      }
      else {
        this.leavesGroup.nativeElement.style.opacity = 0;
      }

      //everything else
      if (scrollPercentage > 0.80){
        var opacity = (scrollPercentage - 0.8) /0.2
        this.importantTextGroup.nativeElement.style.opacity = opacity;
        this.nonImportantTextGroup.nativeElement.style.opacity = opacity;
        this.socialsGroup.nativeElement.style.opacity = opacity;
      }
      else {
        this.importantTextGroup.nativeElement.style.opacity = 0;
        this.nonImportantTextGroup.nativeElement.style.opacity = 0;
        this.socialsGroup.nativeElement.style.opacity = 0;
      }
    })

  }
  

}
