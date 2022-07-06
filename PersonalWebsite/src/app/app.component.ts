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

    
    //set the correct transform location for each leaf
    var leaves = this.leavesGroup.nativeElement.children;
    for (var i = 0; i < leaves.length; i++){
      //set the transform origin to the center of the individual leaf
      //get location of leaf
      var leafLocation = leaves[i].getBoundingClientRect();
      //get parents size
      var parentSize = this.leavesGroup.nativeElement.getBoundingClientRect();
      
      var xLocation = ((leafLocation.x + leafLocation.width/2) / parentSize.width * 100)
      var yLocation = ((leafLocation.y + leafLocation.height) / parentSize.height * 50) //I don't know why these numbers work but they do???

      leaves[i].style.transformOrigin =  xLocation + '% ' + yLocation + '%'//leafLocation.x + ' ' + leafLocation.y;
    }


    
    //on scroll change
    window.addEventListener('scroll', () => {
      var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      
      //branches
      var drawLength = longestPath - longestPath * Math.min(scrollPercentage / 0.7, 1);
      //drawLength = Math.max(drawLength, longestPath)
      paths.forEach(path => {
        path.style.strokeDashoffset = drawLength.toString();
      })

      //console.log({scrollPercentage});

      //leaves
      if (scrollPercentage > 0.6){
        var opacity = Math.min((scrollPercentage - 0.6) / 0.3, 1)
        this.leavesGroup.nativeElement.style.opacity = opacity;

        //scale up individual leaves
        var leaves = this.leavesGroup.nativeElement.children;
        for (var i = 0; i < leaves.length; i++){
          leaves[i].style.transform = 'scale(' + (0.5 + opacity/2) + ')';
        }

        
      }
      else {
        this.leavesGroup.nativeElement.style.opacity = 0;
      }

      //everything else
      if (scrollPercentage > 0.80){
        var opacity = (scrollPercentage - 0.8) /0.2
        //this.importantTextGroup.nativeElement.style.opacity = opacity;
        //this.nonImportantTextGroup.nativeElement.style.opacity = opacity;
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
