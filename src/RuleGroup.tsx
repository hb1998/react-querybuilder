import { Fragment } from 'react';
import * as React from 'react';
import { RuleGroupProps } from './types';

export const RuleGroup = ({
  id,
  parentId,
  combinator = 'and',
  rules = [],
  translations,
  schema,
  not,
  context
}: RuleGroupProps) => {
  const {
    classNames,
    combinators,
    controls,
    createRule,
    createRuleGroup,
    getLevel,
    isRuleGroup,
    onGroupAdd,
    onGroupRemove,
    onPropChange,
    onRuleAdd,
    showCombinatorsBetweenRules,
    showNotToggle
  } = schema;
  const hasParentGroup = () => !!parentId;
  const onCombinatorChange = (value: any) => {
    onPropChange('combinator', value, id);
  };
  const onNotToggleChange = (checked: boolean) => {
    onPropChange('not', checked, id);
  };
  const addRule = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const newRule = createRule();
    onRuleAdd(newRule, id);
  };
  const addGroup = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, id);
  };
  // const removeGroup = (event: React.MouseEvent<Element, MouseEvent>) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   onGroupRemove(id, parentId || /* istanbul ignore next */ '');
  // };
  const level = getLevel(id);
  return (
    <div className={`ruleGroup ${classNames.ruleGroup}`} data-rule-group-id={id} data-level={level}>
      <div className={`ruleGroup-header ${classNames.header}`}>
        {showCombinatorsBetweenRules ? null : (
          <controls.combinatorSelector
            options={combinators}
            value={combinator}
            title={translations.combinators.title}
            className={`ruleGroup-combinators ${classNames.combinators}`}
            handleOnChange={onCombinatorChange}
            rules={rules}
            level={level}
            context={context}
          />
        )}
        {!showNotToggle ? null : (
          <controls.notToggle
            className={`ruleGroup-notToggle ${classNames.notToggle}`}
            title={translations.notToggle.title}
            label={translations.notToggle.label}
            checked={not}
            handleOnChange={onNotToggleChange}
            level={level}
            context={context}
          />
        )}
        <controls.addRuleAction
          label={translations.addRule.label}
          title={translations.addRule.title}
          className={`ruleGroup-addRule ${classNames.addRule}`}
          handleOnClick={addRule}
          rules={rules}
          level={level}
          context={context}
        />
        <controls.addGroupAction
          label={translations.addGroup.label}
          title={translations.addGroup.title}
          className={`ruleGroup-addGroup ${classNames.addGroup}`}
          handleOnClick={addGroup}
          rules={rules}
          level={level}
          context={context}
        />
      </div>
      {rules.map((r, idx) => (
        <Fragment key={r.id}>
          {idx && showCombinatorsBetweenRules ? (
            <controls.combinatorSelector
              options={combinators}
              value={combinator}
              title={translations.combinators.title}
              className={`ruleGroup-combinators betweenRules ${classNames.combinators}`}
              handleOnChange={onCombinatorChange}
              rules={rules}
              level={level}
              context={context}
            />
          ) : null}
          {isRuleGroup(r) ? (
            <controls.ruleGroup
              id={r.id!}
              schema={schema}
              parentId={id}
              combinator={r.combinator}
              translations={translations}
              rules={r.rules}
              not={!!r.not}
              context={context}
            />
          ) : (
            <controls.rule
              id={r.id!}
              field={r.field}
              value={r.value}
              operator={r.operator}
              schema={schema}
              parentId={id}
              translations={translations}
              context={context}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

RuleGroup.displayName = 'RuleGroup';
