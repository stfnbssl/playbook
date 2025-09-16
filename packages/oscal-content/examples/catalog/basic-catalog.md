# Sample Control Catalog

The following catalog examples illustrate a simple control catalog. This catalog is represented in the prose below. OSCAL catalog representations in [XML](xml/basic-catalog.xml), [JSON](json/basic-catalog.json), and [YAML](yaml/basic-catalog.yaml) are also available, which illustrate formatting the prose below in the OSCAL catalog XML, JSON, and YAML formats.

# Example Basic Catalog in Prose

> The following is a short excerpt from [ISO/IEC 27002:2013](https://www.iso.org/standard/54533.html), _Information technology — Security techniques — Code of practice for information security controls_. This work is provided here under copyright "fair use" for non-profit, educational purposes only. Copyrights for this work are held by the publisher, the International Organization for Standardization (ISO).

- Version 1.0
- Published: 02.02.2020
- Last Modified: 02.10.2020

## 1 Organization of Information Security

### 1.1 Internal Organization

**Objective:** To establish a management framework to initiate and control the implementation and
operation of information security within the organization.

#### 1.1.1 Information security roles and responsibilities

**Control**

All information security responsibilities should be defined and allocated.  

**Implementation Guidance**

Allocation of information security responsibilities should be done in accordance with the information security policies. Responsibilities for the protection of individual assets and for carrying out specific information security processes should be identified. Responsibilities for information security risk management activities and in particular for acceptance of residual risks should be defined. These responsibilities should be supplemented, where necessary, with more detailed guidance for specific sites and information processing facilities. Local responsibilities for the protection of assets and for carrying out specific security processes should be defined.

Individuals with allocated information security responsibilities may delegate security tasks to others.

Nevertheless, they remain accountable and should determine that any delegated tasks have been correctly performed.

Areas for which individuals are responsible should be stated. In particular the following should take place:

<ol type="a">
    <li>the assets and information security processes should be identified and defined;</li>
    <li>the entity responsible for each asset or information security process should be assigned and the details of this responsibility should be documented;</li>
    <li>authorization levels should be defined and documented;</li>
    <li>to be able to fulfil responsibilities in the information security area the appointed individuals should be competent in the area and be given opportunities to keep up to date with developments;</li>
    <li>coordination and oversight of information security aspects of supplier relationships should be identified and documented.</li>
</ol>

**Other information**

Many organizations appoint an information security manager to take overall responsibility for the development and implementation of information security and to support the identification of controls.

However, responsibility for resourcing and implementing the controls will often remain with individual managers. 

One common practice is to appoint an owner for each asset who then becomes responsible for its day-to-day protection. 

#### 1.1.2 Segregation of duties

**Control**

Conflicting duties and areas of responsibility should be segregated to reduce opportunities for
unauthorized or unintentional modification or misuse of the organization's assets.

**Implementation guidance**

Care should be taken that no single person can access, modify or use assets without authorization or detection. The initiation of an event should be separated from its authorization. The possibility of collusion should be considered in designing the controls.

Small organizations may find segregation of duties difficult to achieve, but the principle should be applied as far as is possible and practicable. Whenever it is difficult to segregate, other controls such as monitoring of activities, audit trails and management supervision should be considered.

**Other information**

Segregation of duties is a method for reducing the risk of accidental or deliberate misuse of an organization's assets.

## 2 Access Control

### 2.1 Business Requirements of Access Control

**Objective:** To limit access to information and information processing facilities.

#### 2.1.1 Access control policy

**Control**

An access control policy should be established, documented and reviewed based on business and information security requirements.

**Implementation guidance**

Asset owners should determine appropriate access control rules, access rights and restrictions for specific user roles towards their assets, with the amount of detail and the strictness of the controls reflecting the associated information security risks.

Access controls are both logical and physical and these should be considered together.

Users and service providers should be given a clear statement of the business requirements to be met by access controls.

The policy should take account of the following:

<ol type="a">
    <li>security requirements of business applications;</li>
    <li>policies for information dissemination and authorization, e.g. the need-to-know principle and information security levels and classification of information;</li>
    <li>consistency between the access rights and information classification policies of systems and networks;</li>
    <li>relevant legislation and any contractual obligations regarding limitation of access to data or services;</li>
    <li>management of access rights in a distributed and networked environment which recognizes all types of connections available;</li>
    <li>segregation of access control roles, e.g. access request, access authorization, access administration;</li>
    <li>requirements for formal authorization of access requests;</li>
    <li>requirements for periodic review of access rights;</li>
    <li>removal of access rights;</li>
    <li>archiving of records of all significant events concerning the use and management of user identities and secret authentication information;</li>
    <li>roles with privileged access.</li>
</ol>

**Other information**

Care should be taken when specifying access control rules to consider:

<ol type="a">
    <li>establishing rules based on the premise "Everything is generally forbidden unless expressly permitted" rather than the weaker rule "Everything is generally permitted unless expressly forbidden";</li>
    <li>changes in information labels that are initiated automatically by information processing facilities and those initiated at the discretion of a user;</li>
    <li>changes in user permissions that are initiated automatically by the information system and those initiated by an administrator;</li>
    <li>rules which require specific approval before enactment and those which do not.</li>
</ol>

Access control rules should be supported by formal procedures and defined responsibilities.

Role based access control is an approach used successfully by many organizations to link access rights with business roles.

Two of the frequent principles directing the access control policy are:

<ol type="a">
    <li>Need-to-know: you are only granted access to the information you need to perform your tasks (different tasks/roles mean different need-to-know and hence different access profile);</li>
    <li>Need-to-use: you are only granted access to the information processing facilities (IT equipment, applications, procedures, rooms) you need to perform your task/job/role.</li>
</ol>

#### 2.1.2 Access to networks and network services

**Control**

Users should only be provided with access to the network and network services that they have been specifically authorized to use.

**Implementation guidance**

A policy should be formulated concerning the use of networks and network services. This policy should cover:

<ol type="a">
    <li>the networks and network services which are allowed to be accessed;</li>
    <li>authorization procedures for determining who is allowed to access which networks and networked services;</li>
    <li>management controls and procedures to protect access to network connections and network services;</li>
    <li>the means used to access networks and network services (e.g. use of VPN or wireless network);</li>
    <li>user authentication requirements for accessing various network services;</li>
    <li>monitoring of the use of network services.</li>
</ol>

The policy on the use of network services should be consistent with the organization's access control policy.

**Other information**

Unauthorized and insecure connections to network services can affect the whole organization. This control is particularly important for network connections to sensitive or critical business applications or to users in high-risk locations, e.g. public or external areas that are outside the organization's information security management and control.
