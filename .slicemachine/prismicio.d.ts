// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for About documents */
interface AboutDocumentData {
    /**
     * Title field in *About*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * Description field in *About*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: about.description[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    description: prismicT.GroupField<Simplify<AboutDocumentDataDescriptionItem>>;
    /**
     * Profile field in *About*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    profile: prismicT.GroupField<Simplify<AboutDocumentDataProfileItem>>;
    /**
     * Clients field in *About*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: about.clients[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    clients: prismicT.GroupField<Simplify<AboutDocumentDataClientsItem>>;
    /**
     * Awards field in *About*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: about.awards[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    awards: prismicT.GroupField<Simplify<AboutDocumentDataAwardsItem>>;
    /**
     * Slice Zone field in *About*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: about.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<AboutDocumentDataSlicesSlice>;
}
/**
 * Item in About → Description
 *
 */
export interface AboutDocumentDataDescriptionItem {
    /**
     * Title field in *About → Description*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.description[].title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * Text field in *About → Description*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.description[].text
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    text: prismicT.KeyTextField;
}
/**
 * Item in About → Profile
 *
 */
export interface AboutDocumentDataProfileItem {
    /**
     * Name field in *About → Profile*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Last Name field in *About → Profile*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].last_name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    last_name: prismicT.KeyTextField;
    /**
     * Role field in *About → Profile*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].role
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    role: prismicT.KeyTextField;
    /**
     * Image field in *About → Profile*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
    /**
     * Topic field in *About → Profile*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].topic
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    topic: prismicT.KeyTextField;
    /**
     * Item field in *About → Profile*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].item
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    item: prismicT.KeyTextField;
    /**
     * Sub Item field in *About → Profile*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.profile[].sub_item
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    sub_item: prismicT.KeyTextField;
}
/**
 * Item in About → Clients
 *
 */
export interface AboutDocumentDataClientsItem {
    /**
     * Topic field in *About → Clients*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.clients[].topic
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    topic: prismicT.KeyTextField;
    /**
     * Image field in *About → Clients*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: about.clients[].image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
}
/**
 * Item in About → Awards
 *
 */
export interface AboutDocumentDataAwardsItem {
    /**
     * Awards Type field in *About → Awards*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.awards[].awards_type
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    awards_type: prismicT.KeyTextField;
    /**
     * Title field in *About → Awards*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.awards[].title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * Details field in *About → Awards*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.awards[].details
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    details: prismicT.KeyTextField;
}
/**
 * Slice for *About → Slice Zone*
 *
 */
type AboutDocumentDataSlicesSlice = ProfileSlice;
/**
 * About document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<AboutDocumentData>, "about", Lang>;
/** Content for Contact documents */
interface ContactDocumentData {
    /**
     * Paragraph field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.paragraph
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    paragraph: prismicT.KeyTextField;
}
/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<ContactDocumentData>, "contact", Lang>;
/** Content for Home documents */
interface HomeDocumentData {
    /**
     * First Name field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.first_name
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    first_name: prismicT.KeyTextField;
    /**
     * Second Name field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.second_name
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    second_name: prismicT.KeyTextField;
    /**
     * First Paragraph field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.first_paragraph
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    first_paragraph: prismicT.KeyTextField;
    /**
     * Second Paragraph field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.second_paragraph
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    second_paragraph: prismicT.KeyTextField;
    /**
     * Third Paragraph field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.third_paragraph
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    third_paragraph: prismicT.KeyTextField;
    /**
     * First Button field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.first_button
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    first_button: prismicT.KeyTextField;
    /**
     * Second Button field in *Home*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home.second_button
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    second_button: prismicT.KeyTextField;
}
/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;
/** Content for Order documents */
interface OrderDocumentData {
    /**
     * List Order field in *Order*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: order.list_order[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    list_order: prismicT.GroupField<Simplify<OrderDocumentDataListOrderItem>>;
}
/**
 * Item in Order → List Order
 *
 */
export interface OrderDocumentDataListOrderItem {
    /**
     * Project field in *Order → List Order*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: order.list_order[].project
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    project: prismicT.RelationField;
}
/**
 * Order document from Prismic
 *
 * - **API ID**: `order`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type OrderDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<OrderDocumentData>, "order", Lang>;
/** Content for Project documents */
interface ProjectDocumentData {
    /**
     * Client field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.client
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    client: prismicT.KeyTextField;
    /**
     * Title field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * Agency field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.agency
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    agency: prismicT.KeyTextField;
    /**
     * Cover field in *Project*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: project.cover
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    cover: prismicT.ImageField<never>;
    /**
     * Crew field in *Project*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project.crew[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    crew: prismicT.GroupField<Simplify<ProjectDocumentDataCrewItem>>;
    /**
     * Content field in *Project*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project.content[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    content: prismicT.GroupField<Simplify<ProjectDocumentDataContentItem>>;
}
/**
 * Item in Project → Crew
 *
 */
export interface ProjectDocumentDataCrewItem {
    /**
     * Title field in *Project → Crew*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.crew[].title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * Name field in *Project → Crew*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.crew[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
}
/**
 * Item in Project → Content
 *
 */
export interface ProjectDocumentDataContentItem {
    /**
     * Description field in *Project → Content*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.content[].description
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    description: prismicT.KeyTextField;
    /**
     * Video field in *Project → Content*
     *
     * - **Field Type**: Embed
     * - **Placeholder**: *None*
     * - **API ID Path**: project.content[].video
     * - **Documentation**: https://prismic.io/docs/core-concepts/embed
     *
     */
    video: prismicT.EmbedField;
    /**
     * Image field in *Project → Content*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: project.content[].image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
    /**
     * Size field in *Project → Content*
     *
     * - **Field Type**: Select
     * - **Placeholder**: Image size
     * - **API ID Path**: project.content[].size
     * - **Documentation**: https://prismic.io/docs/core-concepts/select
     *
     */
    size: prismicT.SelectField<"1-big" | "2-medium-medium" | "3-medium_ss" | "3-m_small_s" | "3-ms_small" | "4-small_sm" | "4-s_small_m" | "4-ss_medium">;
}
/**
 * Project document from Prismic
 *
 * - **API ID**: `project`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProjectDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<ProjectDocumentData>, "project", Lang>;
export type AllDocumentTypes = AboutDocument | ContactDocument | HomeDocument | OrderDocument | ProjectDocument;
/**
 * Primary content in Profile → Primary
 *
 */
interface ProfileSliceDefaultPrimary {
    /**
     * Title field in *Profile → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: profile.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *Profile → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: profile.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
}
/**
 * Default variation for Profile Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Profile`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProfileSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<ProfileSliceDefaultPrimary>, never>;
/**
 * Primary content in Profile → Primary
 *
 */
interface ProfileSliceProfilePrimary {
    /**
     * Name field in *Profile → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.primary.name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Last Name field in *Profile → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.primary.last_name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    last_name: prismicT.KeyTextField;
    /**
     * Role field in *Profile → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.primary.role
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    role: prismicT.KeyTextField;
    /**
     * Image field in *Profile → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.primary.image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
}
/**
 * Profile variation for Profile Slice
 *
 * - **API ID**: `profile`
 * - **Description**: `Profile`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProfileSliceProfile = prismicT.SharedSliceVariation<"profile", Simplify<ProfileSliceProfilePrimary>, never>;
/**
 * Primary content in Profile → Primary
 *
 */
interface ProfileSliceAccomplishmentsPrimary {
    /**
     * Topic field in *Profile → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.primary.topic
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    topic: prismicT.KeyTextField;
}
/**
 * Item in Profile → Items
 *
 */
export interface ProfileSliceAccomplishmentsItem {
    /**
     * Item field in *Profile → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.items[].item
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    item: prismicT.KeyTextField;
    /**
     * Sub Item field in *Profile → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: profile.items[].sub_item
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    sub_item: prismicT.KeyTextField;
}
/**
 * Accomplishments variation for Profile Slice
 *
 * - **API ID**: `accomplishments`
 * - **Description**: `Profile`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProfileSliceAccomplishments = prismicT.SharedSliceVariation<"accomplishments", Simplify<ProfileSliceAccomplishmentsPrimary>, Simplify<ProfileSliceAccomplishmentsItem>>;
/**
 * Slice variation for *Profile*
 *
 */
type ProfileSliceVariation = ProfileSliceDefault | ProfileSliceProfile | ProfileSliceAccomplishments;
/**
 * Profile Shared Slice
 *
 * - **API ID**: `profile`
 * - **Description**: `Profile`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProfileSlice = prismicT.SharedSlice<"profile", ProfileSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { AboutDocumentData, AboutDocumentDataDescriptionItem, AboutDocumentDataProfileItem, AboutDocumentDataClientsItem, AboutDocumentDataAwardsItem, AboutDocumentDataSlicesSlice, AboutDocument, ContactDocumentData, ContactDocument, HomeDocumentData, HomeDocument, OrderDocumentData, OrderDocumentDataListOrderItem, OrderDocument, ProjectDocumentData, ProjectDocumentDataCrewItem, ProjectDocumentDataContentItem, ProjectDocument, AllDocumentTypes, ProfileSliceDefaultPrimary, ProfileSliceDefault, ProfileSliceProfilePrimary, ProfileSliceProfile, ProfileSliceAccomplishmentsPrimary, ProfileSliceAccomplishmentsItem, ProfileSliceAccomplishments, ProfileSliceVariation, ProfileSlice };
    }
}
