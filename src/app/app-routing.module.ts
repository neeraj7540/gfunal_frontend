import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChoosetemplateComponent } from './choosetemplate/choosetemplate.component';
import { PaymentsComponent } from './payments/payments.component';
import { PackagesComponent } from './packages/packages.component';
import { LandingPageBuilderComponent } from './landing-page-builder/landing-page-builder.component'
import { TestComponent } from './test/test.component'
import { TemplateCategoriesComponent } from './template-categories/template-categories.component';
import { AuthGuard } from './auth.guard';
import { StudentAuthGuardGuard } from './student-auth-guard.guard';

import { SignupConfirmationComponent } from './signup-confirmation/signup-confirmation.component';
import { LpDashboardComponent } from './lp-dashboard/lp-dashboard.component';
import { SavedLandingPageComponent } from './saved-landing-page/saved-landing-page.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LandingimportcontactsComponent } from './landingimportcontacts/landingimportcontacts.component';
import { LeadsComponent } from './leads/leads.component';
import { DomainsComponent } from './domains/domains.component';
import { LpListsComponent } from './lp-lists/lp-lists.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component'
import { PreviewLandingPageComponent } from './preview-landing-page/preview-landing-page.component';

//Blog import
import { BlogTemplateCategoriesComponent } from './blogModule/blog-template-categories/blog-template-categories.component';
import { ChooseBlogTemplateComponent } from './blogModule/choose-blog-template/choose-blog-template.component';
import { BlogDashboardComponent } from './blogModule/blog-dashboard/blog-dashboard.component';
import { BlogPostListComponent } from './blogModule/blog-post-list/blog-post-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { BlogTemplate1Component } from './blogModule/template/blog-template1/blog-template1.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { BlogListComponent } from './blogModule/blog-list/blog-list.component';
import { AddPostComponent } from './blogModule/add-post/add-post.component';
import { AddPageComponent } from './blogModule/add-page/add-page.component';
import { AddUserComponent } from './funnel-module/add-user/add-user.component';
import { FunnelDashboardComponent } from './funnel-module/funnel-dashboard/funnel-dashboard.component';
import { FunnelCreateContactComponent } from './funnel-module/funnel-create-contact/funnel-create-contact.component';
import { FunnelContactsComponent } from './funnel-module/funnel-contacts/funnel-contacts.component';
import { FunnelUsersComponent } from './funnel-module/funnel-users/funnel-users.component';
import { FunnelSalesComponent } from './funnel-module/funnel-sales/funnel-sales.component';
import { FunnelStatsComponent } from './funnel-module/funnel-stats/funnel-stats.component';
import { FunnelImportContactsComponent } from './funnel-module/funnel-import-contacts/funnel-import-contacts.component';
import { FunnelContactsMapFieldsComponent } from './funnel-module/funnel-contacts-map-fields/funnel-contacts-map-fields.component';
import { FunnelListComponent } from './funnel-module/funnel-list/funnel-list.component';
import { BHeaderComponent } from './blogModule/b-header/b-header.component';
import { FunnelSidebarComponent } from './funnel-module/funnel-sidebar/funnel-sidebar.component';
import { CategoriesComponent } from './blogModule/categories/categories.component';
import { BlogMenuComponent } from './blogModule/blog-menu/blog-menu.component';
import { BFooterComponent } from './blogModule/b-footer/b-footer.component';
import { FunnelOptinMultipleTemplatesComponent } from './funnel-module/funnel-optin-multiple-templates/funnel-optin-multiple-templates.component';
import { FunnelAddStepSidebarComponent } from './funnel-module/funnel-add-step-sidebar/funnel-add-step-sidebar.component';
import { FunnelSubHeaderComponent } from './funnel-module/funnel-sub-header/funnel-sub-header.component';
import { FunnelStepsComponent } from './funnel-module/funnel-steps/funnel-steps.component';
import { FunnelSettingsComponent } from './funnel-module/funnel-settings/funnel-settings.component';
import { FunnelTemplateThumbComponent } from './funnel-module/funnel-template-thumb/funnel-template-thumb.component';
import { FunnelStepsCategoriesComponent } from './funnel-module/funnel-steps-categories/funnel-steps-categories.component';
import { FunnelOptinSingleTemplateComponent } from './funnel-module/funnel-optin-single-template/funnel-optin-single-template.component';
import { FunnelOptinStepTemplateComponent } from './funnel-module/funnel-optin-step-template/funnel-optin-step-template.component';
import { FunnelOptinTemplateThumbComponent } from './funnel-module/funnel-optin-template-thumb/funnel-optin-template-thumb.component';
import { FunnelOptinStepSettingsComponent } from './funnel-module/funnel-optin-step-settings/funnel-optin-step-settings.component';
import { FunnelOptinStepSettingsFieldsComponent } from './funnel-module/funnel-optin-step-settings-fields/funnel-optin-step-settings-fields.component';
import { FunnelOptinSettingsComponent } from './funnel-module/funnel-optin-settings/funnel-optin-settings.component';
import { GeneralSettingsComponent } from './blogModule/general-settings/general-settings.component';
import { BlogCommentsComponent } from './blogModule/blog-comments/blog-comments.component';
import { PageListComponent } from './blogModule/page-list/page-list.component';
import { FunnelProductsComponent } from './funnel-module/products/products.component';

//E-commerce import
import { EcHeaderComponent } from './ecommerceModule/ec-header/ec-header.component';
import { EcDashboardComponent } from './ecommerceModule/ec-dashboard/ec-dashboard.component';
import { ProductsComponent } from './ecommerceModule/products/products.component';
import { AddProductComponent } from './ecommerceModule/add-product/add-product.component';
import { InventoryComponent } from './ecommerceModule/inventory/inventory.component';
import { CollectionsComponent } from './ecommerceModule/collections/collections.component';
import { CreateCollectionComponent } from './ecommerceModule/create-collection/create-collection.component';
import { OrdersComponent } from './ecommerceModule/orders/orders.component';
import { CreateOrderComponent } from './ecommerceModule/create-order/create-order.component';
import { SliderComponent } from './ecommerceModule/slider/slider.component';
import { ImageWithTextComponent } from './ecommerceModule/image-with-text/image-with-text.component';
import { BestOfStoreComponent } from './ecommerceModule/best-of-store/best-of-store.component';
import { AnalyticsComponent } from './ecommerceModule/analytics/analytics.component';
import { DiscountsComponent } from './ecommerceModule/discounts/discounts.component';
import { EcSettingsComponent } from './ecommerceModule/ec-settings/ec-settings.component';
import { EcGeneralSettingsComponent } from './ecommerceModule/ec-general-settings/ec-general-settings.component';
import { TaxRegionsComponent } from './ecommerceModule/tax-regions/tax-regions.component';
import { EcNotificationsComponent } from './ecommerceModule/ec-notifications/ec-notifications.component';
import { EcShippingComponent } from './ecommerceModule/ec-shipping/ec-shipping.component';
import { CheckoutComponent } from './ecommerceModule/checkout/checkout.component';

import { CourseTemplatesComponent } from './courseBuilder/course-templates/course-templates.component';
import { CourseInnerSidebarComponent } from './courseBuilder/course-inner-sidebar/course-inner-sidebar.component';
import { CourseTemplateComponent } from './courseBuilder/course-template/course-template.component';
import { CreateCourseDetailsComponent } from './courseBuilder/create-course-details/create-course-details.component';
import { CourseCurriculumComponent } from './courseBuilder/course-curriculum/course-curriculum.component';
import { CourseSubHeaderComponent } from './courseBuilder/course-sub-header/course-sub-header.component';
// import { CourseAddChapterSidebarComponent } from './courseBuilder/course-add-chapter-sidebar/course-add-chapter-sidebar.component';
import { CourseAddModuleComponent } from './courseBuilder/course-add-module/course-add-module.component';
// import { CourseAddModuleSidebarComponent } from './courseBuilder/course-add-module-sidebar/course-add-module-sidebar.component';
import { CourseEditModuleComponent } from './courseBuilder/course-edit-module/course-edit-module.component';
import { CourseEditModuleSidebarComponent } from './courseBuilder/course-edit-module-sidebar/course-edit-module-sidebar.component';
import { CourseAddLessonComponent } from './courseBuilder/course-add-lesson/course-add-lesson.component';
// import { CourseAddLessonSidebarComponent } from './courseBuilder/course-add-lesson-sidebar/course-add-lesson-sidebar.component';
import { CourseEditLessonComponent } from './courseBuilder/course-edit-lesson/course-edit-lesson.component';
// import { CourseEditLessonSidebarComponent } from './courseBuilder/course-edit-lesson-sidebar/course-edit-lesson-sidebar.component';
import { CourselistComponent } from './courseBuilder/courselist/courselist.component';
import { AcademylistComponent } from './courseBuilder/academylist/academylist.component';
import { CourseTemplateCategoriesComponent } from './courseBuilder/course-template-categories/course-template-categories.component';
import { ChoosecoursetemplateComponent } from './courseBuilder/choosecoursetemplate/choosecoursetemplate.component';
import { CourseLessonAddVideoComponent } from './courseBuilder/course-lesson-add-video/course-lesson-add-video.component';
import { CourseEditLessonAddVideoComponent } from './courseBuilder/course-edit-lesson-add-video/course-edit-lesson-add-video.component'
import { CourseLessonEditQuizComponent } from './courseBuilder/course-lesson-edit-quiz/course-lesson-edit-quiz.component';
import { CourseLessonAssignmentComponent } from './courseBuilder/course-lesson-assignment/course-lesson-assignment.component';
import { CourseEditLessonAssignmentComponent } from './courseBuilder/course-edit-lesson-assignment/course-edit-lesson-assignment.component'
// import { CourseLessonAddVideoSidebarComponent } from './courseBuilder/course-lesson-add-video-sidebar/course-lesson-add-video-sidebar.component';
import { CourseLessonAddQuizComponent } from './courseBuilder/course-lesson-add-quiz/course-lesson-add-quiz.component';
// import { CourseLessonAddQuizSidebarComponent } from './courseBuilder/course-lesson-add-quiz-sidebar/course-lesson-add-quiz-sidebar.component';
// import { CourseLessonAssignmentSidebarComponent } from './courseBuilder/course-lesson-assignment-sidebar/course-lesson-assignment-sidebar.component';
import { CourseLessonAddQuizQuestionsComponent } from './courseBuilder/course-lesson-add-quiz-questions/course-lesson-add-quiz-questions.component';
import { CourseLessonEditQuizQuestionsComponent } from './courseBuilder/course-lesson-edit-quiz-questions/course-lesson-edit-quiz-questions.component';
import { CoursePublishComponent } from './courseBuilder/course-publish/course-publish.component';
import { CoursePricingComponent } from './courseBuilder/course-pricing/course-pricing.component';
// import { CoursePublishSidebarComponent } from './courseBuilder/course-publish-sidebar/course-publish-sidebar.component';
// import { CoursePricingSidebarComponent } from './courseBuilder/course-pricing-sidebar/course-pricing-sidebar.component';
import { CourseAccessLevelsComponent } from './courseBuilder/course-access-levels/course-access-levels.component';
import { CourseAccessLevelsNamePriceComponent } from './courseBuilder/course-access-levels-name-price/course-access-levels-name-price.component';
import { CourseAccessLevelsDetailsViewComponent } from './courseBuilder/course-access-levels-details-view/course-access-levels-details-view.component';
import { CourseBuilderComponent } from './courseBuilder/course-builder/course-builder.component';
import { CourseAnnouncementsComponent } from './courseBuilder/course-announcements/course-announcements.component';
import { CourseComposeAnnouncementsComponent } from './courseBuilder/course-compose-announcements/course-compose-announcements.component';
import { CourseEngagementComponent } from './courseBuilder/course-engagement/course-engagement.component';
import { CourseLessonQuizListComponent } from './courseBuilder/course-lesson-quiz-list/course-lesson-quiz-list.component';
import { CourseLessonVideosListComponent } from './courseBuilder/course-lesson-videos-list/course-lesson-videos-list.component';
import { CourseReviewsComponent } from './courseBuilder/course-reviews/course-reviews.component';
import { CourseSettingsComponent } from './courseBuilder/course-settings/course-settings.component';
import { CourseStudentsComponent } from './courseBuilder/course-students/course-students.component';
import { CourseLessonAssignmentListComponent } from './courseBuilder/course-lesson-assignment-list/course-lesson-assignment-list.component';
import { StudentDashboardComponent } from './courseBuilder/student-dashboard/student-dashboard.component';
import { StudentCourseViewComponent } from './courseBuilder/student-course-view/student-course-view.component';
import { EcomDashSignupComponent } from './ecom-dash/ecom-dash-signup/ecom-dash-signup.component';
import { EcomDashLoginComponent } from './ecom-dash/ecom-dash-login/ecom-dash-login.component';
import { EcomDashCartpageComponent } from './ecom-dash/ecom-dash-cartpage/ecom-dash-cartpage.component';
import { EcomDashDashboardComponent } from './ecom-dash/ecom-dash-dashboard/ecom-dash-dashboard.component';

import { FunnelOptinSettingsFieldsComponent } from './funnel-module/funnel-optin-settings-fields/funnel-optin-settings-fields.component';
import { ShopListComponent } from './ecommerceModule/shop-list/shop-list.component';
import { ShopTemplateCategoriesComponent } from './ecommerceModule/shop-template-categories/shop-template-categories.component';
import { ChooseShopTemplateComponent } from './ecommerceModule/choose-shop-template/choose-shop-template.component';
import { StudentQuizViewComponent } from './courseBuilder/student-quiz-view/student-quiz-view.component';
import { StudentQuizResultViewComponent } from './courseBuilder/student-quiz-result-view/student-quiz-result-view.component';
import { StudentAssignmentComponent } from './courseBuilder/student-assignment/student-assignment.component';
import { CommonSettingsComponent } from './common-settings/common-settings.component';
import { CommonSettingsContentComponent } from './common-settings-content/common-settings-content.component';
import { CommonSettingsSidebarComponent } from './common-settings-sidebar/common-settings-sidebar.component';
import { UpgradePackageComponent } from './upgrade-package/upgrade-package.component';
import { LpAddUserSettingsComponent } from './lp-add-user-settings/lp-add-user-settings.component';
import { LpDomainSettingsComponent } from './lp-domain-settings/lp-domain-settings.component';
import { LpUserSettingsComponent } from './lp-user-settings/lp-user-settings.component';
import { LpUsersListSettingsComponent } from './lp-users-list-settings/lp-users-list-settings.component';
import { ChooseTypeComponent } from './courseBuilder/choose-type/choose-type.component';
import { CreateSubjectsComponent } from './courseBuilder/create-subjects/create-subjects.component';
import { ViewSubjectsComponent } from './courseBuilder/view-subjects/view-subjects.component';
import { CourseBuilderTemplatesComponent } from './courseBuilder/course-builder-templates/course-builder-templates.component';
import { CourseAddSubjectsComponent } from './courseBuilder/course-add-subjects/course-add-subjects.component';
import { AffilateProgramComponent } from './funnel-module/affilate-program/affilate-program.component';
import { AffilateProgramDashboardComponent } from './funnel-module/affilate-program-dashboard/affilate-program-dashboard.component';
import { AffilateDashboardComponent } from './funnel-module/affilate-dashboard/affilate-dashboard.component';
import { AffilateReferredAccountsComponent } from './funnel-module/affilate-referred-accounts/affilate-referred-accounts.component';
import { AffilateWithdrawalsComponent } from './funnel-module/affilate-withdrawals/affilate-withdrawals.component';
import { EcomDashAddAddressComponent } from './ecom-dash/ecom-dash-add-address/ecom-dash-add-address.component';
import { EcomDashEditAddressComponent } from './ecom-dash/ecom-dash-edit-address/ecom-dash-edit-address.component';
import { EcomDashSavedAddressComponent } from './ecom-dash/ecom-dash-saved-address/ecom-dash-saved-address.component';
import { EcomDashOrderDetailsComponent } from './ecom-dash/ecom-dash-order-details/ecom-dash-order-details.component';
import { EcomDashOrderlistComponent } from './ecom-dash/ecom-dash-orderlist/ecom-dash-orderlist.component';
import { EcomDashWishlistComponent } from './ecom-dash/ecom-dash-wishlist/ecom-dash-wishlist.component';
import { EcomDashAllProductsComponent } from './ecom-dash/ecom-dash-all-products/ecom-dash-all-products.component';
import { EcomDashProductDetailsComponent } from './ecom-dash/ecom-dash-product-details/ecom-dash-product-details.component';
import { EcomDashEditprofileComponent } from './ecom-dash/ecom-dash-editprofile/ecom-dash-editprofile.component';
import { CbTemplateComponent } from './courseBuilder/cb-template/cb-template.component';
import { CbHeaderComponent } from './courseBuilder/cb-header/cb-header.component';
import { CbTemplateBuyNowComponent } from './courseBuilder/cb-template-buy-now/cb-template-buy-now.component';
import { CbTemplateChoosePackageComponent } from './courseBuilder/cb-template-choose-package/cb-template-choose-package.component';
import { CourseBuilderDashboardComponent } from './courseBuilder/course-builder-dashboard/course-builder-dashboard.component';
import { CustomerComponent } from './ecommerceModule/customer/customer.component';
import { NavigationComponent } from './ecommerceModule/navigation/navigation.component';
import { EcPageComponent } from './ecommerceModule/ec-page/ec-page.component';
import { EcAddPageComponent } from './ecommerceModule/ec-add-page/ec-add-page.component';
import { EcFooterComponent } from './ecommerceModule/ec-footer/ec-footer.component';
import { AddFunnelProductComponent } from './funnel-module/add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { AcademyCourseListComponent } from './courseBuilder/academy-course-list/academy-course-list.component';

import { StudentSignupOtpComponent } from './courseBuilder/student-signup-otp/student-signup-otp.component';
import { StudentAnouncmentsComponent } from './courseBuilder/student-anouncments/student-anouncments.component';
import { CreateCustomerComponent } from './ecommerceModule/create-customer/create-customer.component';
import { EcomFooterComponent } from './ecom-dash/ecom-footer/ecom-footer.component';
import { EcomLoginComponent } from './ecom-dash/ecom-login/ecom-login.component';
import { EcomRegisterComponent } from './ecom-dash/ecom-register/ecom-register.component';
import { OtpVerificationComponent } from './ecom-dash/otp-verification/otp-verification.component';

import { DiscountListComponent } from './ecommerceModule/discount-list/discount-list.component';
import { AnnouncementsComponent } from './ecommerceModule/announcements/announcements.component';
import { ComposeAnnouncementComponent } from './ecommerceModule/compose-announcement/compose-announcement.component';
import { AffiliateProgramComponent } from './affiliate-program/affiliate-program.component';
import { LandingPagesComponent } from './affiliate-program/landing-pages/landing-pages.component';
import { TermsComponent } from './affiliate-program/terms/terms.component';
import { AffiliateDashboardComponent } from './affiliate-program/affiliate-dashboard/affiliate-dashboard.component';
import { CoursebuilderpagesComponent } from './affiliate-program/coursebuilderpages/coursebuilderpages.component';
import { EcommercePagesComponent } from './affiliate-program/ecommerce-pages/ecommerce-pages.component';
import { FunnelsPagesComponent } from './affiliate-program/funnels-pages/funnels-pages.component';

const routes: Routes = [
  { path: 'academy-course-list', component: AcademyCourseListComponent },
  { path: 'choose-type', component: ChooseTypeComponent, canActivate: [AuthGuard] },
  { path: 'create-subjects', component: CreateSubjectsComponent, canActivate: [AuthGuard] },
  { path: 'view-subjects', component: ViewSubjectsComponent, canActivate: [AuthGuard] },
  { path: 'ecom-dash-add-address', component: EcomDashAddAddressComponent },
  { path: 'ecom-dash-edit-address', component: EcomDashEditAddressComponent },
  { path: 'ecom-dash-saved-address', component: EcomDashSavedAddressComponent },
  { path: 'ecom-dash-wishlist', component: EcomDashWishlistComponent, canActivate: [AuthGuard] },
  { path: 'ecom-dash-orderlist', component: EcomDashOrderlistComponent },
  { path: 'ecom-dash-order-details', component: EcomDashOrderDetailsComponent },
  { path: 'ecom-dash-all-products', component: EcomDashAllProductsComponent },
  { path: 'ecom-dash-product-details', component: EcomDashProductDetailsComponent },
  { path: 'ecom-dash-edit-profile', component: EcomDashEditprofileComponent, canActivate: [AuthGuard] },
  { path: 'affilate-program', component: AffilateProgramComponent, canActivate: [AuthGuard] },
  { path: 'affilate-program-dashboard', component: AffilateProgramDashboardComponent, canActivate: [AuthGuard] },
  { path: 'affilate-dashboard', component: AffilateDashboardComponent, canActivate: [AuthGuard] },
  { path: 'affilate-referred-accounts', component: AffilateReferredAccountsComponent, canActivate: [AuthGuard] },
  { path: 'affilate-withdrawals', component: AffilateWithdrawalsComponent, canActivate: [AuthGuard] },
  { path: 'course-add-subjects', component: CourseAddSubjectsComponent, canActivate: [AuthGuard] },
  { path: 'course-builder-templates', component: CourseBuilderTemplatesComponent, canActivate: [AuthGuard] },


  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: LandingpageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'lp-dashboard', component: LpDashboardComponent, canActivate: [AuthGuard] },
  { path: 'saved-landing-page', component: SavedLandingPageComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'landingimportcontacts', component: LandingimportcontactsComponent, canActivate: [AuthGuard] },
  { path: 'leads', component: LeadsComponent, canActivate: [AuthGuard] },
  { path: 'domains', component: DomainsComponent, canActivate: [AuthGuard] },
  { path: 'lp-lists', component: LpListsComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'preview-landing-page', component: PreviewLandingPageComponent },
  { path: 'invoice-list', component: InvoiceListComponent, canActivate: [AuthGuard] },
  { path: 'create-invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'choosetemplate', component: ChoosetemplateComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'packages', component: PackagesComponent, canActivate: [AuthGuard] },
  { path: 'preview', component: LandingPageBuilderComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'template-categories', component: TemplateCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'signup-confirmation', component: SignupConfirmationComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'preview-landing-page', component: PreviewLandingPageComponent },
  { path: 'common-settings', component: CommonSettingsComponent },
  { path: 'common-settings-content', component: CommonSettingsContentComponent },
  { path: 'common-settings-sidebar', component: CommonSettingsSidebarComponent },
  { path: 'upgrade-package', component: UpgradePackageComponent },
  { path: 'lp-add-user-settings', component: LpAddUserSettingsComponent },
  { path: 'lp-domain-settings', component: LpDomainSettingsComponent },
  { path: 'lp-user-settings', component: LpUserSettingsComponent },
  { path: 'lp-users-list-settings', component: LpUsersListSettingsComponent },
  { path: 'signup-confirmation', component: SignupConfirmationComponent, },
  { path: 'lp-dashboard', component: LpDashboardComponent, canActivate: [AuthGuard] },
  { path: 'saved-landing-page', component: SavedLandingPageComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'leads', component: LeadsComponent, canActivate: [AuthGuard] },
  { path: 'domains', component: DomainsComponent, canActivate: [AuthGuard] },
  { path: 'lp-lists', component: LpListsComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'preview-landing-page', component: PreviewLandingPageComponent },
  { path: 'invoice-list', component: InvoiceListComponent, canActivate: [AuthGuard] },
  { path: 'create-invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },




  //blog path
  { path: 'blog-list', component: BlogListComponent, canActivate: [AuthGuard] },
  { path: 'blog-template-categories', component: BlogTemplateCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'choose-blogtemplate', component: ChooseBlogTemplateComponent, canActivate: [AuthGuard] },
  { path: 'blog-dashboard', component: BlogDashboardComponent, canActivate: [AuthGuard] },
  { path: 'blog-post-list', component: BlogPostListComponent, canActivate: [AuthGuard] },
  { path: 'create-contact', component: CreateContactComponent, canActivate: [AuthGuard] },
  { path: 'blogtemplate1', component: BlogTemplate1Component, canActivate: [AuthGuard] },
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: 'add-page', component: AddPageComponent, canActivate: [AuthGuard] },
  { path: 'page-list', component: PageListComponent, canActivate: [AuthGuard] },
  { path: 'b-header', component: BHeaderComponent, canActivate: [AuthGuard] },





  //funnel path
  { path: 'funnel-sidebar', component: FunnelSidebarComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'funnel-dashboard', component: FunnelDashboardComponent, canActivate: [AuthGuard] },
  { path: 'funnel-create-contact', component: FunnelCreateContactComponent, canActivate: [AuthGuard] },
  { path: 'funnel-contacts', component: FunnelContactsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-users', component: FunnelUsersComponent, canActivate: [AuthGuard] },
  { path: 'funnel-sales', component: FunnelSalesComponent, canActivate: [AuthGuard] },
  { path: 'funnel-stats', component: FunnelStatsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-import-contacts', component: FunnelImportContactsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-contacts-map-fields', component: FunnelContactsMapFieldsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-list', component: FunnelListComponent, canActivate: [AuthGuard] },
  { path: 'blog-header', component: BHeaderComponent, canActivate: [AuthGuard] },
  { path: 'blog-categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'blog-menu', component: BlogMenuComponent, canActivate: [AuthGuard] },
  { path: 'blog-footer', component: BFooterComponent, canActivate: [AuthGuard] },
  { path: 'general-settings', component: GeneralSettingsComponent, canActivate: [AuthGuard] },
  { path: 'blog-comments', component: BlogCommentsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-products', component: FunnelProductsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-add-products', component: AddFunnelProductComponent, canActivate: [AuthGuard] },


  //E-commerce
  { path: 'ec-header', component: EcHeaderComponent },
  { path: 'funnel-optin-multiple-templates', component: FunnelOptinMultipleTemplatesComponent },
  { path: 'funnel-add-step-sidebar', component: FunnelAddStepSidebarComponent },
  { path: 'funnel-subheader', component: FunnelSubHeaderComponent },
  { path: 'funnel-steps', component: FunnelStepsComponent },
  { path: 'funnel-settings', component: FunnelSettingsComponent },
  { path: 'funnel-template-thumb', component: FunnelTemplateThumbComponent },
  { path: 'funnel-steps-categories', component: FunnelStepsCategoriesComponent },
  { path: 'funnel-single-template', component: FunnelOptinSingleTemplateComponent },
  { path: 'funnel-optin-step-template', component: FunnelOptinStepTemplateComponent },
  { path: 'funnel-optin-template-thumb', component: FunnelOptinTemplateThumbComponent },
  { path: 'funnel-optin-step-settings', component: FunnelOptinStepSettingsComponent },
  { path: 'funnel-optin-step-settings-fields', component: FunnelOptinStepSettingsFieldsComponent },
  { path: 'funnel-optin-settings', component: FunnelOptinSettingsComponent },

  { path: 'funnel-optin-multiple-templates/steps', component: FunnelOptinMultipleTemplatesComponent },
  { path: 'funnel-optin-multiple-templates/settings', component: FunnelOptinSettingsFieldsComponent },

  { path: 'ecommerce/shop-list', component: ShopListComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/shop-template-categories', component: ShopTemplateCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/choose-shop-template', component: ChooseShopTemplateComponent, canActivate: [AuthGuard] },

  { path: 'ecommerce/header', component: EcHeaderComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/dashboard', component: EcDashboardComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/collections', component: CollectionsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/create-collection', component: CreateCollectionComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/create-order', component: CreateOrderComponent, canActivate: [AuthGuard] },

  { path: 'ecommerce/slider', component: SliderComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/image-with-text', component: ImageWithTextComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/best-of-store', component: BestOfStoreComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/discounts', component: DiscountsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/settings', component: EcSettingsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/customers', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/navigation', component: NavigationComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/pages', component: EcPageComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/add-page', component: EcAddPageComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/ec-footer', component: EcFooterComponent, canActivate: [AuthGuard] },

  { path: 'ecommerce/general-settings', component: EcGeneralSettingsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/tax-regions', component: TaxRegionsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/notifications', component: EcNotificationsComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/shipping', component: EcShippingComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'ecommerce/create-customer', component: CreateCustomerComponent, canActivate: [AuthGuard] },

  { path: 'ecommerce/discount-list', component: DiscountListComponent, canActivate: [AuthGuard] },
  {
    path: 'funnel-optin-multiple-templates',            //<---- parent component declared here
    component: FunnelOptinMultipleTemplatesComponent, canActivate: [AuthGuard],
    children: [                          //<---- child components declared here
      {
        path: 'settings',
        component: FunnelOptinSettingsFieldsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'steps',
        component: FunnelStepsComponent, canActivate: [AuthGuard]
        // children: [                          //<---- child components declared here

        // ]
      },
      {
        path: 'steps/funnel-step-template',
        component: FunnelOptinStepTemplateComponent, canActivate: [AuthGuard]
      },
      {
        path: 'steps/funnel-step-settings-fields',
        component: FunnelOptinStepSettingsFieldsComponent, canActivate: [AuthGuard]
      }

    ]
  },
  // {
  //   path: 'steps',            //<---- parent component declared here
  //   component: FunnelStepsComponent,
  //   children: [                          //<---- child components declared here
  //     {
  //       path: 'funnel-single-template',
  //       component: FunnelOptinSingleTemplateComponent
  //     }
  //   ]
  // }

  { path: 'funnel-optin-multiple-templates', component: FunnelOptinMultipleTemplatesComponent, canActivate: [AuthGuard] },
  { path: 'funnel-add-step-sidebar', component: FunnelAddStepSidebarComponent, canActivate: [AuthGuard] },
  { path: 'funnel-subheader', component: FunnelSubHeaderComponent, canActivate: [AuthGuard] },
  { path: 'funnel-steps', component: FunnelStepsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-settings', component: FunnelSettingsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-template-thumb', component: FunnelTemplateThumbComponent, canActivate: [AuthGuard] },
  { path: 'funnel-steps-categories', component: FunnelStepsCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-single-template', component: FunnelOptinSingleTemplateComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-step-template', component: FunnelOptinStepTemplateComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-template-thumb', component: FunnelOptinTemplateThumbComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-step-settings', component: FunnelOptinStepSettingsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-step-settings-fields', component: FunnelOptinStepSettingsFieldsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-settings', component: FunnelOptinSettingsComponent, canActivate: [AuthGuard] },

  // Course Builder path
  { path: 'academylist', component: AcademylistComponent, canActivate: [AuthGuard] },
  { path: 'courselist', component: CourselistComponent, canActivate: [AuthGuard] },
  { path: 'course-templates', component: CourseTemplatesComponent, canActivate: [AuthGuard] },
  { path: 'course-inner-sidebar', component: CourseInnerSidebarComponent, canActivate: [AuthGuard] },
  { path: 'course-template', component: CourseTemplateComponent, canActivate: [AuthGuard] },
  { path: 'create-course-details', component: CreateCourseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'course-curriculum', component: CourseCurriculumComponent, canActivate: [AuthGuard] },
  { path: 'course-sub-header', component: CourseSubHeaderComponent, canActivate: [AuthGuard] },
  { path: 'course-add-module', component: CourseAddModuleComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-module', component: CourseEditModuleComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-module-sideabar', component: CourseEditModuleSidebarComponent, canActivate: [AuthGuard] },
  { path: 'course-add-lesson', component: CourseAddLessonComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-lesson', component: CourseEditLessonComponent, canActivate: [AuthGuard] },
  { path: 'course-template-categories', component: CourseTemplateCategoriesComponent },
  { path: 'choosecoursetemplate', component: ChoosecoursetemplateComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-add-video', component: CourseLessonAddVideoComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-lesson-add-video', component: CourseEditLessonAddVideoComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-add-quiz', component: CourseLessonAddQuizComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-edit-quiz', component: CourseLessonEditQuizComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-add-quiz-questions', component: CourseLessonAddQuizQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-edit-quiz-questions', component: CourseLessonEditQuizQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-assignment', component: CourseLessonAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-lesson-assignment', component: CourseEditLessonAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course-publish', component: CoursePublishComponent, canActivate: [AuthGuard] },
  { path: 'course-pricing', component: CoursePricingComponent, canActivate: [AuthGuard] },
  { path: 'course-builder', component: CourseBuilderComponent, canActivate: [AuthGuard] },
  { path: 'course-access-levels', component: CourseAccessLevelsComponent, canActivate: [AuthGuard] },
  { path: 'course-access-levels-name-price', component: CourseAccessLevelsNamePriceComponent, canActivate: [AuthGuard] },
  { path: 'course-access-levels-details-view', component: CourseAccessLevelsDetailsViewComponent, canActivate: [AuthGuard] },
  { path: 'course-announcements', component: CourseAnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'course-compose-announcements', component: CourseComposeAnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'course-engagement', component: CourseEngagementComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-quiz-list', component: CourseLessonQuizListComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-videos-list', component: CourseLessonVideosListComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-assignment-list', component: CourseLessonAssignmentListComponent, canActivate: [AuthGuard] },
  { path: 'course-reviews', component: CourseReviewsComponent, canActivate: [AuthGuard] },
  { path: 'course-settings', component: CourseSettingsComponent, canActivate: [AuthGuard] },
  { path: 'course-builder-dashboard', component: CourseBuilderDashboardComponent, canActivate: [AuthGuard] },
  { path: 'course-students', component: CourseStudentsComponent, canActivate: [AuthGuard] },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [StudentAuthGuardGuard] },
  { path: 'course-view', component: StudentCourseViewComponent, canActivate: [StudentAuthGuardGuard] },
  { path: 'cb-template', component: CbTemplateComponent, canActivate: [AuthGuard] },
  { path: 'cb-header', component: CbHeaderComponent, canActivate: [AuthGuard] },
  { path: 'cb-template-buy-now', component: CbTemplateBuyNowComponent },
  { path: 'cb-template-choose-package', component: CbTemplateChoosePackageComponent, canActivate: [StudentAuthGuardGuard] },
  { path: 'quiz-view', component: StudentQuizViewComponent, canActivate: [StudentAuthGuardGuard] },
  { path: 'quiz-view-result', component: StudentQuizResultViewComponent, canActivate: [StudentAuthGuardGuard] },
  { path: 'assignment-view', component: StudentAssignmentComponent, canActivate: [StudentAuthGuardGuard] },
  { path: 'student-announcements', component: StudentAnouncmentsComponent, canActivate: [StudentAuthGuardGuard] },


  { path: 'ecom-dash-login', component: EcomDashLoginComponent },
  { path: 'ecom-dash-signup', component: EcomDashSignupComponent },
  { path: 'ecom-dash-cart', component: EcomDashCartpageComponent, canActivate: [AuthGuard] },
  { path: 'ecom-dash-dashboard', component: EcomDashDashboardComponent },
  { path: 'student-confirmation', component: StudentSignupOtpComponent },


  { path: 'funnel-optin-multiple-templates', component: FunnelOptinMultipleTemplatesComponent, canActivate: [AuthGuard] },
  { path: 'funnel-add-step-sidebar', component: FunnelAddStepSidebarComponent, canActivate: [AuthGuard] },
  { path: 'funnel-subheader', component: FunnelSubHeaderComponent, canActivate: [AuthGuard] },
  { path: 'funnel-steps', component: FunnelStepsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-settings', component: FunnelSettingsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-template-thumb', component: FunnelTemplateThumbComponent, canActivate: [AuthGuard] },
  { path: 'funnel-steps-categories', component: FunnelStepsCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-single-template', component: FunnelOptinSingleTemplateComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-step-template', component: FunnelOptinStepTemplateComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-template-thumb', component: FunnelOptinTemplateThumbComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-step-settings', component: FunnelOptinStepSettingsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-step-settings-fields', component: FunnelOptinStepSettingsFieldsComponent, canActivate: [AuthGuard] },
  { path: 'funnel-optin-settings', component: FunnelOptinSettingsComponent, canActivate: [AuthGuard] },

  // Course Builder path
  { path: 'courselist', component: CourselistComponent, canActivate: [AuthGuard] },
  { path: 'course-templates', component: CourseTemplatesComponent, canActivate: [AuthGuard] },
  { path: 'course-inner-sidebar', component: CourseInnerSidebarComponent, canActivate: [AuthGuard] },
  { path: 'course-template', component: CourseTemplateComponent, canActivate: [AuthGuard] },
  { path: 'create-course-details', component: CreateCourseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'course-curriculum', component: CourseCurriculumComponent, canActivate: [AuthGuard] },
  { path: 'course-sub-header', component: CourseSubHeaderComponent, canActivate: [AuthGuard] },
  { path: 'course-add-module', component: CourseAddModuleComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-module', component: CourseEditModuleComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-module-sideabar', component: CourseEditModuleSidebarComponent, canActivate: [AuthGuard] },
  { path: 'course-add-lesson', component: CourseAddLessonComponent, canActivate: [AuthGuard] },
  { path: 'course-edit-lesson', component: CourseEditLessonComponent, canActivate: [AuthGuard] },
  { path: 'course-template-categories', component: CourseTemplateCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'choosecoursetemplate', component: ChoosecoursetemplateComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-add-video', component: CourseLessonAddVideoComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-add-quiz', component: CourseLessonAddQuizComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-add-quiz-questions', component: CourseLessonAddQuizQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-assignment', component: CourseLessonAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course-publish', component: CoursePublishComponent, canActivate: [AuthGuard] },
  { path: 'course-pricing', component: CoursePricingComponent, canActivate: [AuthGuard] },
  { path: 'course-builder', component: CourseBuilderComponent, canActivate: [AuthGuard] },
  { path: 'course-access-levels', component: CourseAccessLevelsComponent, canActivate: [AuthGuard] },
  { path: 'course-access-levels-name-price', component: CourseAccessLevelsNamePriceComponent, canActivate: [AuthGuard] },
  { path: 'course-access-levels-details-view', component: CourseAccessLevelsDetailsViewComponent, canActivate: [AuthGuard] },
  { path: 'course-announcements', component: CourseAnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'course-compose-announcements', component: CourseComposeAnnouncementsComponent },
  { path: 'course-engagement', component: CourseEngagementComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-quiz-list', component: CourseLessonQuizListComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-videos-list', component: CourseLessonVideosListComponent, canActivate: [AuthGuard] },
  { path: 'course-lesson-assignment-list', component: CourseLessonAssignmentListComponent, canActivate: [AuthGuard] },
  { path: 'course-reviews', component: CourseReviewsComponent },
  { path: 'course-settings', component: CourseSettingsComponent, canActivate: [AuthGuard] },
  { path: 'course-builder-dashboard', component: CourseBuilderDashboardComponent, canActivate: [AuthGuard] },
  { path: 'course-students', component: CourseStudentsComponent, canActivate: [AuthGuard] },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'course-view', component: StudentCourseViewComponent, canActivate: [AuthGuard] },
  { path: 'cb-template', component: CbTemplateComponent, canActivate: [AuthGuard] },
  { path: 'cb-header', component: CbHeaderComponent, canActivate: [AuthGuard] },
  { path: 'cb-template-buy-now', component: CbTemplateBuyNowComponent, canActivate: [AuthGuard] },
  { path: 'cb-template-choose-package', component: CbTemplateChoosePackageComponent, canActivate: [AuthGuard] },



  { path: 'ecom-dash-login', component: EcomDashLoginComponent },
  { path: 'ecom-dash-signup', component: EcomDashSignupComponent },
  { path: 'ecom-dash-cart', component: EcomDashCartpageComponent, canActivate: [AuthGuard] },
  { path: 'ecom-dash-dashboard', component: EcomDashDashboardComponent, canActivate: [AuthGuard] },
  { path: 'ecom-footer', component: EcomFooterComponent, canActivate: [AuthGuard] },

  { path: 'ecom-login', component: EcomLoginComponent },
  { path: 'ecom-register', component: EcomRegisterComponent },
  
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'ecommerce/announcements', component: AnnouncementsComponent , canActivate: [AuthGuard]},
  { path: 'ecommerce/compose-announcement', component: ComposeAnnouncementComponent , canActivate: [AuthGuard]},
  
  //Affiliate Program
  { path: 'affiliate-program', component: AffiliateProgramComponent , canActivate: [AuthGuard]},
  { path: 'landing-pages', component: LandingPagesComponent , canActivate: [AuthGuard]},
  { path: 'terms', component: TermsComponent , canActivate: [AuthGuard]},
  { path: 'affiliate-dashboard', component: AffiliateDashboardComponent , canActivate: [AuthGuard]},
  { path: 'coursebuilderpages', component: CoursebuilderpagesComponent , canActivate: [AuthGuard]},
  { path: 'ecommerce-pages', component: EcommercePagesComponent , canActivate: [AuthGuard]},
  { path: 'funnels-pages', component: FunnelsPagesComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
