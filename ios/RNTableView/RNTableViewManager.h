//
//  RCTTableViewManager.h
//  RCTTableView
//
//  Created by Pavlo Aksonov on 18.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <React/RCTViewManager.h>
#import "RNTableView.h"
@interface RNTableViewManager : RCTViewManager
@property(nonatomic,strong) RNTableView *tableview;
@end
