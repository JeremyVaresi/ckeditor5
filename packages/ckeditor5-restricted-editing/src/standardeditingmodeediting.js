/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module restricted-editing/standardeditingmodeediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import RestrictedEditingExceptionCommand from './restrictededitingexceptioncommand';

/**
 * The standard editing mode editing feature.
 *
 * * It introduces the `restrictedEditingException` text attribute that is rendered as
 * a `<span>` element with the `ck-restricted-editing-exception` CSS class.
 * * It registers the `'restrictedEditingException'` command.
 *
 * @extends module:core/plugin~Plugin
 */
export default class StandardEditingModeEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'StandardEditingModeEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		editor.model.schema.extend( '$text', { allowAttributes: [ 'restrictedEditingException' ] } );

		editor.conversion.for( 'upcast' ).elementToAttribute( {
			model: 'restrictedEditingException',
			view: {
				name: 'span',
				classes: 'ck-restricted-editing-exception'
			}
		} );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'restrictedEditingException',
			view: ( modelAttributeValue, viewWriter ) => {
				if ( modelAttributeValue ) {
					// Make the restricted editing <span> outer-most in the view.
					return viewWriter.createAttributeElement( 'span', { class: 'ck-restricted-editing-exception' }, { priority: -10 } );
				}
			}
		} );

		editor.commands.add( 'restrictedEditingException', new RestrictedEditingExceptionCommand( editor ) );
	}
}
