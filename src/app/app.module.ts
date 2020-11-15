import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardheaderComponent } from './dashboard/dashboardheader/dashboardheader.component';
import { DashboardsidebarComponent } from './dashboard/dashboardsidebar/dashboardsidebar.component';
import { DashboardcontentComponent } from './dashboard/dashboardcontent/dashboardcontent.component';
import { DashboardfooterComponent } from './dashboard/dashboardfooter/dashboardfooter.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoosetemplateComponent } from './choosetemplate/choosetemplate.component';
import { TemplatelogoComponent } from './choosetemplate/templatelogo/templatelogo.component';
import { TemplateThumbComponent } from './template-thumb/template-thumb.component';
import { PaymentsComponent } from './payments/payments.component';
import { PackagesComponent } from './packages/packages.component';
import { SinglePlanComponent } from './packages/single-plan/single-plan.component';
import { CustomPlanComponent } from './packages/custom-plan/custom-plan.component';
import { LandingPageBuilderComponent } from './landing-page-builder/landing-page-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TestComponent } from './test/test.component';
import { TemplateCategoriesComponent } from './template-categories/template-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ManualloaderComponent } from './manualloader/manualloader.component';
import { SignupConfirmationComponent } from './signup-confirmation/signup-confirmation.component';
import { LpDashboardComponent } from './lp-dashboard/lp-dashboard.component';
import { InnerSidebarComponent } from './inner-sidebar/inner-sidebar.component';
import { SavedLandingPageComponent } from './saved-landing-page/saved-landing-page.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LandingimportcontactsComponent } from './landingimportcontacts/landingimportcontacts.component';
import { LeadsComponent } from './leads/leads.component';
import { DomainsComponent } from './domains/domains.component';
import { LpListsComponent } from './lp-lists/lp-lists.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PreviewLandingPageComponent } from './preview-landing-page/preview-landing-page.component';

import { BlogTemplateCategoriesComponent } from './blogModule/blog-template-categories/blog-template-categories.component';
import { ChooseBlogTemplateComponent } from './blogModule/choose-blog-template/choose-blog-template.component';
import { BlogTemplateThumbComponent } from './blogModule/blog-template-thumb/blog-template-thumb.component';
import { BlogSidebarComponent } from './blogModule/blog-sidebar/blog-sidebar.component';
import { BlogDashboardComponent } from './blogModule/blog-dashboard/blog-dashboard.component';
import { BlogPostListComponent } from './blogModule/blog-post-list/blog-post-list.component';
import { BlogCetegoriesSidebarComponent } from './blogModule/blog-cetegories-sidebar/blog-cetegories-sidebar.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { CategoriesSidebarComponent } from './categories-sidebar/categories-sidebar.component';
import { BlogTemplate1Component } from './blogModule/template/blog-template1/blog-template1.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { BlogListComponent } from './blogModule/blog-list/blog-list.component';
import { AddPostComponent } from './blogModule/add-post/add-post.component';
import { AddPageComponent } from './blogModule/add-page/add-page.component';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PageListComponent } from './blogModule/page-list/page-list.component';
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
import { FunnelOptinSettingsFieldsComponent } from './funnel-module/funnel-optin-settings-fields/funnel-optin-settings-fields.component';
import { CourseTemplatesComponent } from './courseBuilder/course-templates/course-templates.component';
import { CourseInnerSidebarComponent } from './courseBuilder/course-inner-sidebar/course-inner-sidebar.component';
import { CourseTemplateComponent } from './courseBuilder/course-template/course-template.component';
import { CreateCourseDetailsComponent } from './courseBuilder/create-course-details/create-course-details.component';
import { CourseCurriculumComponent } from './courseBuilder/course-curriculum/course-curriculum.component';
import { CourseSubHeaderComponent } from './courseBuilder/course-sub-header/course-sub-header.component';
import { CourseAddModuleComponent } from './courseBuilder/course-add-module/course-add-module.component';
import { CourseEditModuleComponent } from './courseBuilder/course-edit-module/course-edit-module.component';
import { CourseEditModuleSidebarComponent } from './courseBuilder/course-edit-module-sidebar/course-edit-module-sidebar.component';
import { CourseAddLessonComponent } from './courseBuilder/course-add-lesson/course-add-lesson.component';
import { CourseEditLessonComponent } from './courseBuilder/course-edit-lesson/course-edit-lesson.component';
import { CourselistComponent } from './courseBuilder/courselist/courselist.component';
import { CourseTemplateCategoriesComponent } from './courseBuilder/course-template-categories/course-template-categories.component';
import { ChoosecoursetemplateComponent } from './courseBuilder/choosecoursetemplate/choosecoursetemplate.component';
import { CourseTemplateThumbComponent } from './courseBuilder/course-template-thumb/course-template-thumb.component';
import { AccordionComponent } from './courseBuilder/Temp/accordion/accordion.component';
import { AccordionGroupComponent } from './courseBuilder/Temp/accordion-group/accordion-group.component';
import { CourseLessonAddVideoComponent } from './courseBuilder/course-lesson-add-video/course-lesson-add-video.component';
import { CourseLessonAddQuizComponent } from './courseBuilder/course-lesson-add-quiz/course-lesson-add-quiz.component';
import { CourseLessonAssignmentComponent } from './courseBuilder/course-lesson-assignment/course-lesson-assignment.component';
import { CourseLessonAddQuizQuestionsComponent } from './courseBuilder/course-lesson-add-quiz-questions/course-lesson-add-quiz-questions.component';
import { CoursePublishComponent } from './courseBuilder/course-publish/course-publish.component';
import { CoursePricingComponent } from './courseBuilder/course-pricing/course-pricing.component';
import { CourseAccessLevelsComponent } from './courseBuilder/course-access-levels/course-access-levels.component';
import { CourseAccessLevelsNamePriceComponent } from './courseBuilder/course-access-levels-name-price/course-access-levels-name-price.component';
import { CourseAccessLevelsDetailsViewComponent } from './courseBuilder/course-access-levels-details-view/course-access-levels-details-view.component';
import { CourseBuilderComponent } from './courseBuilder/course-builder/course-builder.component';
import { CourseLessonAddQuizQuestionsChoiceComponent } from './courseBuilder/course-lesson-add-quiz-questions-choice/course-lesson-add-quiz-questions-choice.component';
import { CourseAnnouncementsComponent } from './courseBuilder/course-announcements/course-announcements.component';
import { CourseStudentsComponent } from './courseBuilder/course-students/course-students.component';
import { CourseEngagementComponent } from './courseBuilder/course-engagement/course-engagement.component';
import { CourseComposeAnnouncementsComponent } from './courseBuilder/course-compose-announcements/course-compose-announcements.component';
import { CourseSettingsComponent } from './courseBuilder/course-settings/course-settings.component';
import { CourseReviewsComponent } from './courseBuilder/course-reviews/course-reviews.component';
import { CourseLessonVideosListComponent } from './courseBuilder/course-lesson-videos-list/course-lesson-videos-list.component';
import { CourseLessonQuizListComponent } from './courseBuilder/course-lesson-quiz-list/course-lesson-quiz-list.component';
import { CourseLessonAssignmentListComponent } from './courseBuilder/course-lesson-assignment-list/course-lesson-assignment-list.component';
import { StudentSidebarComponent } from './courseBuilder/student-sidebar/student-sidebar.component';
import { StudentDashboardComponent } from './courseBuilder/student-dashboard/student-dashboard.component';
import { StudentDashboardHeaderComponent } from './courseBuilder/student-dashboard-header/student-dashboard-header.component';
import { StudentCourseViewComponent } from './courseBuilder/student-course-view/student-course-view.component';
import { EcomDashLoginComponent } from './ecom-dash/ecom-dash-login/ecom-dash-login.component';
import { EcomDashSignupComponent } from './ecom-dash/ecom-dash-signup/ecom-dash-signup.component';
import { EcomDashDashboardComponent } from './ecom-dash/ecom-dash-dashboard/ecom-dash-dashboard.component';
import { EcomDashCartpageComponent } from './ecom-dash/ecom-dash-cartpage/ecom-dash-cartpage.component';
import { StudentQuizViewComponent } from './courseBuilder/student-quiz-view/student-quiz-view.component';
import { StudentQuizResultViewComponent } from './courseBuilder/student-quiz-result-view/student-quiz-result-view.component';
import { StudentAssignmentComponent } from './courseBuilder/student-assignment/student-assignment.component';
import { CommonSettingsComponent } from './common-settings/common-settings.component';
import { CommonSettingsSidebarComponent } from './common-settings-sidebar/common-settings-sidebar.component';
import { CommonSettingsContentComponent } from './common-settings-content/common-settings-content.component';
import { UpgradePackageComponent } from './upgrade-package/upgrade-package.component';
import { LpUserSettingsComponent } from './lp-user-settings/lp-user-settings.component';
import { LpDomainSettingsComponent } from './lp-domain-settings/lp-domain-settings.component';
import { LpAddUserSettingsComponent } from './lp-add-user-settings/lp-add-user-settings.component';
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

// import { CbTemplateComponent } from './courseBuilder/cb-template/cb-template.component';
// import { CbHeaderComponent } from './courseBuilder/cb-header/cb-header.component';
// import { CbTemplateBuyNowComponent } from './courseBuilder/cb-template-buy-now/cb-template-buy-now.component';
// import { CbTemplateChoosePackageComponent } from './courseBuilder/cb-template-choose-package/cb-template-choose-package.component';

import { EcomDashAddAddressComponent } from './ecom-dash/ecom-dash-add-address/ecom-dash-add-address.component';
import { EcomDashEditAddressComponent } from './ecom-dash/ecom-dash-edit-address/ecom-dash-edit-address.component';
import { EcomDashSavedAddressComponent } from './ecom-dash/ecom-dash-saved-address/ecom-dash-saved-address.component';
import { EcomDashOrderlistComponent } from './ecom-dash/ecom-dash-orderlist/ecom-dash-orderlist.component';
import { EcomDashOrderDetailsComponent } from './ecom-dash/ecom-dash-order-details/ecom-dash-order-details.component';
import { EcomDashWishlistComponent } from './ecom-dash/ecom-dash-wishlist/ecom-dash-wishlist.component';
import { EcomDashAllProductsComponent } from './ecom-dash/ecom-dash-all-products/ecom-dash-all-products.component';
import { EcomDashProductDetailsComponent } from './ecom-dash/ecom-dash-product-details/ecom-dash-product-details.component';
import { EcomDashEditprofileComponent } from './/ecom-dash/ecom-dash-editprofile/ecom-dash-editprofile.component';
import { CbTemplateComponent } from './courseBuilder/cb-template/cb-template.component';
import { CbHeaderComponent } from './courseBuilder/cb-header/cb-header.component';
import { CbTemplateBuyNowComponent } from './courseBuilder/cb-template-buy-now/cb-template-buy-now.component';
import { CbTemplateChoosePackageComponent } from './courseBuilder/cb-template-choose-package/cb-template-choose-package.component';
import { CourseBuilderDashboardComponent } from './courseBuilder/course-builder-dashboard/course-builder-dashboard.component';

import { GeneralSettingsComponent } from './blogModule/general-settings/general-settings.component';

import { BlogCommentsComponent } from './blogModule/blog-comments/blog-comments.component';

import { ShopListComponent } from './ecommerceModule/shop-list/shop-list.component';
import { ShopTemplateCategoriesComponent } from './ecommerceModule/shop-template-categories/shop-template-categories.component';
import { ChooseShopTemplateComponent } from './ecommerceModule/choose-shop-template/choose-shop-template.component';
import { ShopTemplateThumbComponent } from './ecommerceModule/shop-template-thumb/shop-template-thumb.component';
import { ShopCetegoriesSidebarComponent } from './ecommerceModule/shop-cetegories-sidebar/shop-cetegories-sidebar.component';


import { FunnelProductsComponent } from './funnel-module/products/products.component';
import { AddFunnelProductComponent } from './funnel-module/add-product/add-product.component';


import { EcHeaderComponent } from './ecommerceModule/ec-header/ec-header.component';
import { EcSidebarComponent } from './ecommerceModule/ec-sidebar/ec-sidebar.component';
import { EcDashboardComponent } from './ecommerceModule/ec-dashboard/ec-dashboard.component';
import { ProductsComponent } from './ecommerceModule/products/products.component';
import { AddProductComponent } from './ecommerceModule/add-product/add-product.component';
import { InventoryComponent } from './ecommerceModule/inventory/inventory.component';
import { CollectionsComponent } from './ecommerceModule/collections/collections.component';
import { CreateCollectionComponent } from './ecommerceModule/create-collection/create-collection.component';
import { OrdersComponent } from './ecommerceModule/orders/orders.component';
import { CreateOrderComponent } from './ecommerceModule/create-order/create-order.component';
import { EcThemeEditorSidebarComponent } from './ecommerceModule/ec-theme-editor-sidebar/ec-theme-editor-sidebar.component';
import { SliderComponent } from './ecommerceModule/slider/slider.component';
import { ImageWithTextComponent } from './ecommerceModule/image-with-text/image-with-text.component';
import { BestOfStoreComponent } from './ecommerceModule/best-of-store/best-of-store.component';
import { AnalyticsComponent } from './ecommerceModule/analytics/analytics.component';
import { DiscountsComponent } from './ecommerceModule/discounts/discounts.component';
import { EcSettingsComponent } from './ecommerceModule/ec-settings/ec-settings.component';
import { CreateDiscountComponent } from './ecommerceModule/create-discount/create-discount.component';
import { EcGeneralSettingsComponent } from './ecommerceModule/ec-general-settings/ec-general-settings.component';
import { TaxRegionsComponent } from './ecommerceModule/tax-regions/tax-regions.component';
import { EcNotificationsComponent } from './ecommerceModule/ec-notifications/ec-notifications.component';
import { EcShippingComponent } from './ecommerceModule/ec-shipping/ec-shipping.component';
import { CheckoutComponent } from './ecommerceModule/checkout/checkout.component';
// import { FunnelOptinMultipleTemplatesComponent } from './funnel-module/funnel-optin-multiple-templates/funnel-optin-multiple-templates.component';
// import { FunnelAddStepSidebarComponent } from './funnel-module/funnel-add-step-sidebar/funnel-add-step-sidebar.component';
// import { FunnelSubHeaderComponent } from './funnel-module/funnel-sub-header/funnel-sub-header.component';
// import { FunnelStepsComponent } from './funnel-module/funnel-steps/funnel-steps.component';
// import { FunnelSettingsComponent } from './funnel-module/funnel-settings/funnel-settings.component';
// import { FunnelTemplateThumbComponent } from './funnel-module/funnel-template-thumb/funnel-template-thumb.component';
// import { FunnelStepsCategoriesComponent } from './funnel-module/funnel-steps-categories/funnel-steps-categories.component';
// import { FunnelOptinSingleTemplateComponent } from './funnel-module/funnel-optin-single-template/funnel-optin-single-template.component';
// import { FunnelOptinStepTemplateComponent } from './funnel-module/funnel-optin-step-template/funnel-optin-step-template.component';
// import { FunnelOptinTemplateThumbComponent } from './funnel-module/funnel-optin-template-thumb/funnel-optin-template-thumb.component';
// import { FunnelOptinStepSettingsComponent } from './funnel-module/funnel-optin-step-settings/funnel-optin-step-settings.component';
// import { FunnelOptinStepSettingsFieldsComponent } from './funnel-module/funnel-optin-step-settings-fields/funnel-optin-step-settings-fields.component';
// import { FunnelOptinSettingsComponent } from './funnel-module/funnel-optin-settings/funnel-optin-settings.component';
// import { FunnelOptinSettingsFieldsComponent } from './funnel-module/funnel-optin-settings-fields/funnel-optin-settings-fields.component';
import { GroupByPipe } from './ecommerceModule/group-by.pipe';
import { CustomerComponent } from './ecommerceModule/customer/customer.component';
import { NavigationComponent } from './ecommerceModule/navigation/navigation.component';
import { EcPageComponent } from './ecommerceModule/ec-page/ec-page.component';
import { EcAddPageComponent } from './ecommerceModule/ec-add-page/ec-add-page.component';
import { EcFooterComponent } from './ecommerceModule/ec-footer/ec-footer.component';
import { from } from 'rxjs';
// import { StudentQuizViewComponent } from './courseBuilder/student-quiz-view/student-quiz-view.component';
// import { StudentQuizResultViewComponent } from './courseBuilder/student-quiz-result-view/student-quiz-result-view.component';
// import { StudentAssignmentComponent } from './courseBuilder/student-assignment/student-assignment.component';
import { StudentSignupOtpComponent } from './courseBuilder/student-signup-otp/student-signup-otp.component';
import { CourseEditLessonAssignmentComponent } from './courseBuilder/course-edit-lesson-assignment/course-edit-lesson-assignment.component'
import { ProfileComponent } from './profile/profile.component';
import { CourseEditLessonAddVideoComponent } from './courseBuilder/course-edit-lesson-add-video/course-edit-lesson-add-video.component';
import { CourseLessonEditQuizComponent } from './courseBuilder/course-lesson-edit-quiz/course-lesson-edit-quiz.component';
import { AcademylistComponent } from './courseBuilder/academylist/academylist.component';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { ReactiveFormsModule } from '@angular/forms';


import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { PlyrModule } from 'ngx-plyr';
import { CourseLessonEditQuizQuestionsComponent } from './courseBuilder/course-lesson-edit-quiz-questions/course-lesson-edit-quiz-questions.component';
import { CourseLessonEditQuizQuestionsChoiceComponent } from './courseBuilder/course-lesson-edit-quiz-questions-choice/course-lesson-edit-quiz-questions-choice.component';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { PushMessagingService } from './push-messaging.service';
import { StudentAnouncmentsComponent } from './courseBuilder/student-anouncments/student-anouncments.component';
import { CreateCustomerComponent } from './ecommerceModule/create-customer/create-customer.component';
import { AcademyCourseListComponent } from './courseBuilder/academy-course-list/academy-course-list.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { EcomFooterComponent } from './ecom-dash/ecom-footer/ecom-footer.component';
import { AddressModalComponent } from './ecom-dash/address-modal/address-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EcomDashHeaderComponent } from './ecom-dash/ecom-dash-header/ecom-dash-header.component';
import { DiscountListComponent } from './ecommerceModule/discount-list/discount-list.component';
import { EcomLoginComponent } from './ecom-dash/ecom-login/ecom-login.component';
import { EcomRegisterComponent } from './ecom-dash/ecom-register/ecom-register.component';
import { OtpVerificationComponent } from './ecom-dash/otp-verification/otp-verification.component';
import { AnnouncementsComponent } from './ecommerceModule/announcements/announcements.component';
import { ComposeAnnouncementComponent } from './ecommerceModule/compose-announcement/compose-announcement.component';
import { AffiliateProgramComponent } from './affiliate-program/affiliate-program.component';
import { AffiliateContentComponent } from './affiliate-program/affiliate-content/affiliate-content.component';
import { LandingPagesComponent } from './affiliate-program/landing-pages/landing-pages.component';
import { TermsComponent } from './affiliate-program/terms/terms.component';
import { AffiliateDashboardComponent } from './affiliate-program/affiliate-dashboard/affiliate-dashboard.component';
import { CoursebuilderpagesComponent } from './affiliate-program/coursebuilderpages/coursebuilderpages.component';
import { EcommercePagesComponent } from './affiliate-program/ecommerce-pages/ecommerce-pages.component';
import { FunnelsPagesComponent } from './affiliate-program/funnels-pages/funnels-pages.component';


@NgModule({
    declarations: [
        AppComponent,
        LandingpageComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        DashboardheaderComponent,
        DashboardsidebarComponent,
        DashboardcontentComponent,
        DashboardfooterComponent,
        LoginComponent,
        SignupComponent,
        ChoosetemplateComponent,
        TemplatelogoComponent,
        TemplateThumbComponent,
        PaymentsComponent,
        PackagesComponent,
        SinglePlanComponent,
        CustomPlanComponent,
        LandingPageBuilderComponent,
        TestComponent,
        TemplateCategoriesComponent,
        ManualloaderComponent,
        SignupConfirmationComponent,
        LpDashboardComponent,
        InnerSidebarComponent,
        SavedLandingPageComponent,
        ContactsComponent,
        LeadsComponent,
        DomainsComponent,
        LpListsComponent,
        ForgotpasswordComponent,
        PreviewLandingPageComponent,
        BlogTemplateCategoriesComponent,
        ChooseBlogTemplateComponent,
        BlogTemplateThumbComponent,
        BlogSidebarComponent,
        BlogDashboardComponent,
        BlogPostListComponent,
        BlogCetegoriesSidebarComponent,
        CreateContactComponent,
        CategoriesSidebarComponent,
        BlogTemplate1Component,
        InvoiceListComponent,
        CreateInvoiceComponent,
        BlogListComponent,
        AddPostComponent,
        AddPageComponent,
        PageListComponent,
        AddUserComponent,
        FunnelDashboardComponent,
        FunnelCreateContactComponent,
        FunnelContactsComponent,
        FunnelUsersComponent,
        FunnelSalesComponent,
        FunnelStatsComponent,
        FunnelImportContactsComponent,
        FunnelContactsMapFieldsComponent,
        FunnelListComponent,
        BHeaderComponent,
        FunnelSidebarComponent,
        CategoriesComponent,
        BlogMenuComponent,
        BFooterComponent,
        FunnelSidebarComponent,
        FunnelOptinMultipleTemplatesComponent,
        FunnelAddStepSidebarComponent,
        FunnelSubHeaderComponent,
        FunnelStepsComponent,
        FunnelSettingsComponent,
        FunnelTemplateThumbComponent,
        FunnelStepsCategoriesComponent,
        FunnelOptinSingleTemplateComponent,
        FunnelOptinStepTemplateComponent,
        FunnelOptinTemplateThumbComponent,
        FunnelOptinStepSettingsComponent,
        FunnelOptinStepSettingsFieldsComponent,
        FunnelOptinSettingsComponent,
        FunnelOptinSettingsFieldsComponent,
        GeneralSettingsComponent,
        BlogCommentsComponent,
        EcHeaderComponent,
        EcSidebarComponent,
        EcDashboardComponent,
        ProductsComponent,
        AddProductComponent,
        InventoryComponent,
        CollectionsComponent,
        CreateCollectionComponent,
        OrdersComponent,
        CreateOrderComponent,
        EcThemeEditorSidebarComponent,
        SliderComponent,
        ImageWithTextComponent,
        BestOfStoreComponent,
        AnalyticsComponent,
        DiscountsComponent,
        EcSettingsComponent,
        ShopListComponent,
        ShopTemplateCategoriesComponent,
        ChooseShopTemplateComponent,
        ShopTemplateThumbComponent,
        ShopCetegoriesSidebarComponent,
        EcGeneralSettingsComponent,
        TaxRegionsComponent,
        EcNotificationsComponent,
        EcShippingComponent,
        CheckoutComponent,
        FunnelSidebarComponent,
        FunnelOptinMultipleTemplatesComponent,
        FunnelAddStepSidebarComponent,
        FunnelSubHeaderComponent,
        FunnelStepsComponent,
        FunnelSettingsComponent,
        FunnelTemplateThumbComponent,
        FunnelStepsCategoriesComponent,
        FunnelOptinSingleTemplateComponent,
        FunnelOptinStepTemplateComponent,
        FunnelOptinTemplateThumbComponent,
        FunnelOptinStepSettingsComponent,
        FunnelOptinStepSettingsFieldsComponent,
        FunnelOptinSettingsComponent,
        FunnelOptinSettingsFieldsComponent,
        CourseTemplatesComponent,
        CourseInnerSidebarComponent,
        CourseTemplateComponent,
        CreateCourseDetailsComponent,
        CourseCurriculumComponent,
        CourseSubHeaderComponent,
        CourseAddModuleComponent,
        CourseEditModuleComponent,
        CourseEditModuleSidebarComponent,
        CourseAddLessonComponent,
        CourseEditLessonComponent,
        CourselistComponent,
        CourseTemplateCategoriesComponent,
        ChoosecoursetemplateComponent,
        CourseTemplateThumbComponent,
        AccordionComponent,
        AccordionGroupComponent,
        CourseLessonAddVideoComponent,
        CourseLessonAddQuizComponent,
        CourseLessonAssignmentComponent,
        CourseLessonAddQuizQuestionsComponent,
        CoursePublishComponent,
        CoursePricingComponent,
        CourseAccessLevelsComponent,
        CourseAccessLevelsNamePriceComponent,
        CourseAccessLevelsDetailsViewComponent,
        CourseBuilderComponent,
        CourseLessonAddQuizQuestionsChoiceComponent,
        CourseAnnouncementsComponent,
        CourseStudentsComponent,
        CourseEngagementComponent,
        CourseComposeAnnouncementsComponent,
        CourseSettingsComponent,
        CourseReviewsComponent,
        CourseLessonVideosListComponent,
        CourseLessonQuizListComponent,
        CourseLessonAssignmentListComponent,
        StudentSidebarComponent,
        StudentDashboardComponent,
        StudentDashboardHeaderComponent,
        StudentCourseViewComponent,
        EcomDashLoginComponent,
        EcomDashSignupComponent,
        EcomDashDashboardComponent,
        EcomDashCartpageComponent,
        CheckoutComponent,
        TaxRegionsComponent,
        EcNotificationsComponent,
        EcShippingComponent,
        CheckoutComponent,
        GroupByPipe,
        CustomerComponent,
        NavigationComponent,
        EcPageComponent,
        EcAddPageComponent,
        EcFooterComponent,
        CreateDiscountComponent,
        AddFunnelProductComponent,
        FunnelProductsComponent,
        LandingimportcontactsComponent,
        StudentQuizViewComponent,
        StudentQuizResultViewComponent,
        StudentAssignmentComponent,
        CommonSettingsComponent,
        CommonSettingsSidebarComponent,
        CommonSettingsContentComponent,
        UpgradePackageComponent,
        LpUserSettingsComponent,
        LpDomainSettingsComponent,
        LpAddUserSettingsComponent,
        LpUsersListSettingsComponent,
        ChooseTypeComponent,
        CreateSubjectsComponent,
        ViewSubjectsComponent,
        CourseBuilderTemplatesComponent,
        CourseAddSubjectsComponent,
        AffilateProgramComponent,
        AffilateProgramDashboardComponent,
        AffilateDashboardComponent,
        AffilateReferredAccountsComponent,
        AffilateWithdrawalsComponent,
        EcomDashAddAddressComponent,
        EcomDashEditAddressComponent,
        EcomDashSavedAddressComponent,
        EcomDashOrderlistComponent,
        EcomDashOrderDetailsComponent,
        EcomDashWishlistComponent,
        EcomDashAllProductsComponent,
        EcomDashProductDetailsComponent,
        EcomDashEditprofileComponent,
        CbTemplateComponent,
        CbHeaderComponent,
        CbTemplateBuyNowComponent,
        CbTemplateChoosePackageComponent,
        StudentSignupOtpComponent,
        CourseBuilderDashboardComponent,
        CourseEditLessonAssignmentComponent,
        ProfileComponent,
        CourseEditLessonAddVideoComponent,
        CourseLessonEditQuizComponent,
        AcademylistComponent,
        CourseLessonEditQuizQuestionsComponent,
        CourseLessonEditQuizQuestionsChoiceComponent,
        StudentAnouncmentsComponent,
        CreateCustomerComponent,
        CourseBuilderDashboardComponent,
        EcomFooterComponent,
        AcademyCourseListComponent,
        AddressModalComponent,
        EcomDashHeaderComponent,
        DiscountListComponent,
        EcomLoginComponent,
        EcomRegisterComponent,
        AnnouncementsComponent,
        ComposeAnnouncementComponent,
        OtpVerificationComponent,
        AffiliateProgramComponent,
        AffiliateContentComponent,
        LandingPagesComponent,
        TermsComponent,
        AffiliateDashboardComponent,
        CoursebuilderpagesComponent,
        EcommercePagesComponent,
        FunnelsPagesComponent
    ],
    imports: [
        TagInputModule,
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        DragDropModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        CommonModule,
        NgxEditorModule,
        // AngularFireDatabaseModule,
        // AngularFireAuthModule,
        // AngularFireMessagingModule,
        // AngularFireModule.initializeApp(environment.firebase),
        TooltipModule.forRoot(),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        PlyrModule,
        MatDialogModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyAleVNSHbEv_xHElsU2AnZqTtZYM3n365A",
            authDomain: "gfunl-953d9.firebaseapp.com",
            databaseURL: "https://gfunl-953d9.firebaseio.com",
            projectId: "gfunl-953d9",
            storageBucket: "gfunl-953d9.appspot.com",
            messagingSenderId: "265309906245",
            appId: "1:265309906245:web:3ff639f398770cab788a2c",
            measurementId: "G-7EQSXQ0QHD"
        }),
        TooltipModule.forRoot()
    ],
    providers: [PushMessagingService, AsyncPipe],
    bootstrap: [AppComponent],
    entryComponents: [
        AddressModalComponent
    ]
})
export class AppModule { }
